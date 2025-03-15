import numpy as np
import tensorflow as tf
from datetime import datetime, timedelta
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
import pandas as pd
from app.schemas import PricePredictionRequest

# Load dataset (same dataset as Jupyter)
df = pd.read_excel("data/vegetable_fruit_prices.xlsx")
df["Date"] = pd.to_datetime(df["Date"])
df["Commodity"] = df["Commodity"].str.strip().str.lower()
df["Market Region"] = df["Market Region"].str.strip().str.lower()

# Fit LabelEncoders on the full dataset (matches Jupyter)
crop_encoder = LabelEncoder()
city_encoder = LabelEncoder()
crop_encoder.fit(df["Commodity"].unique())  # Train on full dataset
city_encoder.fit(df["Market Region"].unique())  # Train on full dataset

# Fit MinMaxScaler on actual price range (same as Jupyter)
scaler_price = MinMaxScaler(feature_range=(0, 1))
scaler_price.fit(df[["Price per Unit (LKR/kg)"]])  # 🚀 FIX: Ensures correct scaling

# Load trained LSTM model
MODEL_PATH = "model/time_series_forecasting_model.keras"
model = tf.keras.models.load_model(MODEL_PATH)

def predict_price(request: PricePredictionRequest):
    """Predicts future weekly prices for the given district & vegetable."""
    try:
        # 🚀 Convert input to lowercase to match Jupyter processing
        district_lower = request.district.strip().lower()
        vegetable_lower = request.vegetable.strip().lower()

        # 🚀 Ensure input exists in encoder classes
        if district_lower not in city_encoder.classes_ or vegetable_lower not in crop_encoder.classes_:
            return {"error": "Invalid district or vegetable"}

        # Encode district & vegetable using the same method from Jupyter
        district_code = city_encoder.transform([district_lower])[0]
        vegetable_code = crop_encoder.transform([vegetable_lower])[0]

        # 🚀 Get last recorded prices for this district & vegetable
        df_filtered = df[
            (df["Commodity"] == vegetable_lower) & 
            (df["Market Region"] == district_lower)
        ].sort_values("Date")

        if df_filtered.empty:
            return {"error": "No data available for this commodity and region"}

        # 🚀 FIX: Get the last available date from the dataset
        last_date = df_filtered["Date"].max()
        future_dates = [(last_date + timedelta(weeks=i+1)).strftime("%Y-%m-%d") for i in range(12)]  # Start from last date

        # Extract last 12 recorded prices (ensure enough data exists)
        last_prices = df_filtered["Price per Unit (LKR/kg)"].values[-12:]

        if len(last_prices) < 12:
            return {"error": "Not enough data for reliable forecasting."}

        # 🚀 FIX: Apply the same MinMaxScaler used in Jupyter
        last_prices_scaled = scaler_price.transform(last_prices.reshape(-1, 1))
        last_prices_scaled = last_prices_scaled.reshape((1, 12, 1))  # Ensure correct shape

        # 🚀 Predict next 12 weeks sequentially using the last known prices
        predicted_prices_scaled = []
        for _ in range(12):
            prediction = model.predict(last_prices_scaled)[0][0]
            predicted_prices_scaled.append(prediction)

            # Shift input for next prediction
            last_prices_scaled = np.roll(last_prices_scaled, shift=-1, axis=1)
            last_prices_scaled[0, -1, 0] = prediction  # Update with new prediction

        # 🚀 Convert predictions back to original price range
        predicted_prices = scaler_price.inverse_transform(
            np.array(predicted_prices_scaled).reshape(-1, 1)
        ).flatten()

        # Format response
        forecast = [{"date": future_dates[i], "predicted_price": round(float(predicted_prices[i]), 2)} for i in range(12)]

        return {"forecast": forecast}

    except Exception as e:
        return {"error": str(e)}
