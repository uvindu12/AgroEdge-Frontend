from pydantic import BaseModel

class PricePredictionRequest(BaseModel):
    location: str
    vegetable: str
