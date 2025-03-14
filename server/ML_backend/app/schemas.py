from pydantic import BaseModel

class PricePredictionRequest(BaseModel):
    district: str
    vegetable: str