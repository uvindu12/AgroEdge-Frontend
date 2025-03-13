import numpy as np
import tensorflow as tf
from app.schemas import PricePredictionRequest

# Load trained model
model = tf.keras.models.load_model("models/time_series_forecasting_model.keras")

# Encoding mappings
location_encoder = {"Colombo": 0, "Kandy": 1, "Dambulla": 2}
vegetable_encoder = {"Carrot": 0, "Beans": 1, "Leeks": 2}

def predict_price(request: PricePredictionRequest):
    """Process input and return the predicted price"""
    location_code = location_encoder.get(request.location, -1)
    vegetable_code = vegetable_encoder.get(request.vegetable, -1)

    if location_code == -1 or vegetable_code == -1:
        return {"error": "Invalid location or vegetable"}

    input_data = np.array([[location_code, vegetable_code]])
    predicted_price = model.predict(input_data)[0][0]

    return {"predicted_price": round(predicted_price, 2)}