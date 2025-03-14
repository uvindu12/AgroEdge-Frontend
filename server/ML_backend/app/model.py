import numpy as np
import tensorflow as tf
from app.schemas import PricePredictionRequest

# Load the trained model
MODEL_PATH = "model/time_series_forecasting_model.keras"
model = tf.keras.models.load_model(MODEL_PATH)

# Encoding mappings (Modify as needed)
district_encoder = {"Colombo": 0, "Kandy": 1, "Dambulla": 2}
vegetable_encoder = {"Carrot": 0, "Beans": 1, "Leeks": 2}

def predict_price(request: PricePredictionRequest):
    """Processes input and returns predicted vegetable price."""
    district_code = district_encoder.get(request.district, -1)
    vegetable_code = vegetable_encoder.get(request.vegetable, -1)

    if district_code == -1 or vegetable_code == -1:
        return {"error": "Invalid district or vegetable"}

    input_data = np.array([[district_code, vegetable_code]])
    predicted_price = model.predict(input_data)[0][0]

    return {"predicted_price": round(predicted_price, 2)}

print("hi")