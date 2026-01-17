from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Serve static files (CSS/JS)
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

model = joblib.load("model/best_model.pkl")

class InputData(BaseModel):
    LIMIT_BAL: float
    SEX: int
    EDUCATION: int
    MARRIAGE: int
    AGE: int
    PAY_0: int
    PAY_2: int
    PAY_3: int
    PAY_4: int
    PAY_5: int
    PAY_6: int
    BILL_AMT1: float
    BILL_AMT2: float
    BILL_AMT3: float
    BILL_AMT4: float
    BILL_AMT5: float
    BILL_AMT6: float
    PAY_AMT1: float
    PAY_AMT2: float
    PAY_AMT3: float
    PAY_AMT4: float
    PAY_AMT5: float
    PAY_AMT6: float

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/predict")
def predict(data: InputData):
    features = np.array([[
        data.LIMIT_BAL, data.SEX, data.EDUCATION, data.MARRIAGE, data.AGE,
        data.PAY_0, data.PAY_2, data.PAY_3, data.PAY_4, data.PAY_5, data.PAY_6,
        data.BILL_AMT1, data.BILL_AMT2, data.BILL_AMT3, data.BILL_AMT4, data.BILL_AMT5, data.BILL_AMT6,
        data.PAY_AMT1, data.PAY_AMT2, data.PAY_AMT3, data.PAY_AMT4, data.PAY_AMT5, data.PAY_AMT6
    ]])

    pred = int(model.predict(features)[0])
    proba = float(model.predict_proba(features)[0][1])

    return {
        "prediction": pred,
        "risk_probability": round(proba, 4),
        "meaning": "Default (Late Payment Risk)" if pred == 1 else "Not Default"
    }
