<<<<<<< HEAD
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from nllb_model import Model, FTLangDetect, Translation
from langauge_mappings import load_language_mappings
import requests
import os
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

REDIS_DATA_URL = os.getenv("REDIS_DATA_URL", "http://data:8002")
DEFAULT_USER_ID = "default_user"

origins = [
    "http://localhost:8002",
    "http://localhost:8001",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://0.0.0.0:8002",
=======
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from nllb_model import Model, FTLangDetect, Translation
from pydantic import BaseModel
from langauge_mappings import load_language_mappings

app = FastAPI()

# Added by L
origins = [
    "http://localhost:8001",
    "http://localhost:8000",
    "http://localhost:3000",
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce
    "http://0.0.0.0:8001",
    "http://0.0.0.0:8000",
    "http://0.0.0.0:3000",
]

app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class TranslationRequest(BaseModel):
    text: str
    target_lang: str
    source_lang: Optional[str] = None

model = Model()
lang_detect = FTLangDetect()
language_options = {}

@app.on_event("startup")
async def startup_event():
    global language_options
    if not language_options:
        language_options = load_language_mappings()
=======
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

model = Model()
lang_detect = FTLangDetect()
langauge_options = {}
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce

@app.get("/get_languages")
def get_languages(shortcode: bool = False) -> list[str]:
    return model.get_languages(shortcode)

<<<<<<< HEAD
@app.post("/translate", response_model=Translation)
async def translate(translation_request: TranslationRequest) -> Translation:
    if not translation_request.target_lang:
        raise HTTPException(status_code=422, detail="Missing required target language parameter")

    translation = model.translate(
        translation_request.text,
        language_options.get(translation_request.target_lang, "English"),
        language_options.get(translation_request.source_lang, None)
    )

    payload = {
        "text": translation_request.text,
        "source_lang": translation_request.source_lang,
        "target_lang": translation_request.target_lang,
        "translated": translation.translated
    }

    try:
        response = requests.post(f'{REDIS_DATA_URL}/save/{DEFAULT_USER_ID}/translations', json=payload)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to save translation to Redis: {str(e)}")

    return translation

@app.get("/language_code_mapping")
def get_language_code_mapping() -> dict[str, str]:
    global language_options
    if not language_options:
        language_options = load_language_mappings()
    return language_options
=======

@app.post("/language_detection")
def detect_language(text: str, k: int = 1, shortcode: bool = False) -> dict[str, float]:
    return lang_detect.detect_language(text, k, shortcode)


@app.post("/translate", response_model=Translation)
def translate(text: str, target_lang: str = "eng_Latn", source_lang: str = None) -> Translation:
    language_options = get_language_code_mapping()

    return model.translate(text, language_options[target_lang], language_options[source_lang])


@app.get("/language_code_mapping")
def get_language_code_mapping() -> dict[str, str]:
    global langauge_options
    if langauge_options == {}:
        langauge_options = load_language_mappings()
    return langauge_options
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce
