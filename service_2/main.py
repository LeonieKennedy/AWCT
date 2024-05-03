from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
import redis
import uvicorn
import json

app = FastAPI()

# Redis connection
rd = redis.Redis(host='redis', port=6379, db=0)

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# User model with username, email, and password
class User(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@app.get("/")
def home():
    return "hello worlds"

@app.post("/signup")
def create_user(user: User):
    if rd.hexists("users", user.email):
        raise HTTPException(status_code=400, detail="User already exists")
    rd.hset("users", user.username, json.dumps({"email": user.email, "password": user.password}))
    return {"message": "User created successfully"}

@app.get("/users")
def get_all_users():
    users = rd.hgetall("users")
    return {email: json.loads(user_data) for email, user_data in users.items()}

def get_user_by_email(email: str) -> dict:
    user_data_raw = rd.hgetall("users")

    if not user_data_raw:
        raise HTTPException(status_code=404, detail="No users found")

    for username, data in user_data_raw.items():
        user_info = json.loads(data)
        if user_info["email"] == email:
            return user_info

    raise HTTPException(status_code=404, detail="User not found")

def verify_password(user_data: dict, password: str) -> bool:
    return user_data["password"] == password

@app.post("/login")
def login_user(form_data: UserLogin):
    print(form_data)
    user_data = get_user_by_email(form_data.email)
    if not verify_password(user_data, form_data.password):
        raise HTTPException(status_code=401, detail="Incorrect password")
    return {"message": "Login successful"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
