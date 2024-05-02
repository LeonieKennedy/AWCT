from fastapi import FastAPI, HTTPException, Body, Query
from fastapi.middleware.cors import CORSMiddleware
import aioredis
from typing import Optional
import json

app = FastAPI()

REDIS_HOST = "redis"
REDIS_PORT = 6379

origins = [
    "http://localhost:8002",
    "http://localhost:8001",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://0.0.0.0:8002",
    "http://0.0.0.0:8001",
    "http://0.0.0.0:8000",
    "http://0.0.0.0:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup_event():
    app.state.redis = aioredis.from_url(f"redis://{REDIS_HOST}:{REDIS_PORT}")

@app.on_event("shutdown")
async def shutdown_event():
    await app.state.redis.wait_closed()

@app.post("/save/{user_id}/{data_type}")
async def save_data(user_id: str, data_type: str, data: dict = Body(...)):
    key = f"{user_id}:{data_type}"  
    data_json = json.dumps(data)
    await app.state.redis.rpush(key, data_json)
    return {"message": f"{data_type.capitalize()} saved successfully"}

@app.get("/data/{user_id}/{data_type}")
async def get_data(user_id: str, data_type: str, limit: Optional[int] = 10):
    key = f"{user_id}:{data_type}"  
    data = await app.state.redis.lrange(key, 0, limit - 1)
    return {"data": [json.loads(d.decode("utf-8")) for d in data]}

@app.delete("/delete/{user_id}/{data_type}")
async def delete_data(user_id: str, data_type: str):
    """Delete data from Redis based on type."""
    key = f"{user_id}:{data_type}"  
    deleted = await app.state.redis.delete(key)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"No {data_type} found for this user")
    return {"message": f"{data_type.capitalize()} deleted successfully"}

@app.get("/latest_data/{user_id}/{data_type}")
async def get_data(user_id: str, data_type: str, limit: int = Query(3, alias="count")):
    key = f"{user_id}:{data_type}" 
    entries = await app.state.redis.lrange(key, 0, limit - 1)
    if not entries:
        raise HTTPException(status_code=404, detail=f"No {data_type} entries found for this user")
    return {"data": [json.loads(entry.decode("utf-8")) for entry in entries]}

#Test functions
#@app.get("/")
#async def read_root():
#    await app.state.redis.ping()
#    return {"message": "Hello, World!"}

#@app.post("/set/{key}")
#async def create_item(key: str, value: str):
#    await app.state.redis.set(key, value)
#    return {"key": key, "value": value}

#@app.get("/get/{key}")
#async def read_item(key: str):
#    value = await app.state.redis.get(key)
#    if value is None:
#        raise HTTPException(status_code=404, detail="Key not found")
#    return {"key": key, "value": value.decode("utf-8")}

#@app.delete("/delete/{key}")
#async def delete_item(key: str):
#    deleted = await app.state.redis.delete(key)
#   if not deleted:
#        raise HTTPException(status_code=404, detail="Key not found")
#    return {"message": "Key deleted successfully", "key": key}