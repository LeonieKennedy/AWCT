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
    "http://0.0.0.0:8001",
    "http://0.0.0.0:8000",
    "http://0.0.0.0:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

model = Model()
lang_detect = FTLangDetect()
langauge_options = {}

@app.get("/get_languages")
def get_languages(shortcode: bool = False) -> list[str]:
    return model.get_languages(shortcode)


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
