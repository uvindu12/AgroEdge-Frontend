from fastapi import FastAPI
from app.model import predict_price
from app.schemas import PricePredictionRequest

app = FastAPI()

@app.post("/predict_price/")
async def predict(request: PricePredictionRequest):
    return predict_price(request)





