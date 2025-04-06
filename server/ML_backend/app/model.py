import numpy as np
import tensorflow as tf
from datetime import datetime, timedelta
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
import pandas as pd
from app.schemas import PricePredictionRequest

# Load dataset
DATA_PATH = "data/vegetable_fruit_prices.xlsx"
df = pd.read_excel(DATA_PATH)
df["Date"] = pd.to_datetime(df["Date"])
df["Commodity"] = df["Commodity"].str.strip().str.lower()
df["Market Region"] = df["Market Region"].str.strip().str.lower()

# Fit LabelEncoders for vegetables and districts
crop_encoder = LabelEncoder()
city_encoder = LabelEncoder()
crop_encoder.fit(df["Commodity"].unique())
city_encoder.fit(df["Market Region"].unique())

# Fit MinMaxScaler for price normalization
scaler_price = MinMaxScaler(feature_range=(0, 1))
scaler_price.fit(df[["Price per Unit (LKR/kg)"]])

# Load trained LSTM model
MODEL_PATH = "model/time_series_forecasting_model.keras"
model = tf.keras.models.load_model(MODEL_PATH)

def predict_price(request: PricePredictionRequest):
    """Predicts price for the selected vegetable in the given district."""
    try:
        # Convert input to lowercase and validate
        district_lower = request.district.strip().lower()
        vegetable_lower = request.vegetable.strip().lower()

        if district_lower not in city_encoder.classes_ or vegetable_lower not in crop_encoder.classes_:
            return {"error": "Invalid district or vegetable"}

        # Filter data for the selected vegetable in the given district
        df_filtered = df[(df["Market Region"] == district_lower) & (df["Commodity"] == vegetable_lower)].sort_values("Date")
        
        if df_filtered.empty:
            return {"error": "No data available for the selected vegetable in this district."}

        # Get last recorded date
        last_date = df_filtered["Date"].max()
        future_dates = [(last_date + timedelta(weeks=i+1)).strftime("%Y-%m-%d") for i in range(12)]
        
        # Extract last 12 recorded prices
        last_prices = df_filtered["Price per Unit (LKR/kg)"].values[-12:]

        if len(last_prices) < 12:
            return {"error": "Not enough data for reliable forecasting."}

        # Apply the same MinMaxScaler used in training
        last_prices_scaled = scaler_price.transform(last_prices.reshape(-1, 1)).reshape((1, 12, 1))
        predicted_prices_scaled = []
        
        # Predict next 12 weeks sequentially
        for _ in range(12):
            prediction = model.predict(last_prices_scaled)[0][0]
            predicted_prices_scaled.append(prediction)
            last_prices_scaled = np.roll(last_prices_scaled, shift=-1, axis=1)
            last_prices_scaled[0, -1, 0] = prediction
        
        # Convert predictions back to original price range
        predicted_prices = scaler_price.inverse_transform(
            np.array(predicted_prices_scaled).reshape(-1, 1)
        ).flatten()
        
        # Format response
        forecast = [{"date": future_dates[i], "predicted_price": round(float(predicted_prices[i]), 2)} for i in range(12)]

        return {
            "district": request.district,
            "vegetable": request.vegetable,
            "forecast": forecast
        }
    
    except Exception as e:
        return {"error": str(e)}
