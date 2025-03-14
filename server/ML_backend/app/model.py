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

# Fit LabelEncoders on full dataset (same as Jupyter)
crop_encoder = LabelEncoder()
city_encoder = LabelEncoder()
crop_encoder.fit(df["Commodity"].unique())
city_encoder.fit(df["Market Region"].unique())

# Fit MinMaxScaler on actual price range (same as Jupyter)
scaler_price = MinMaxScaler(feature_range=(0, 1))
df["Price_Scaled"] = scaler_price.fit_transform(df[["Price per Unit (LKR/kg)"]])  # 🛠 FIX: Ensure Scaling

# Load trained LSTM model
MODEL_PATH = "model/time_series_forecasting_model.keras"
model = tf.keras.models.load_model(MODEL_PATH)

def predict_price(request: PricePredictionRequest):
    """Predicts future weekly prices for the given district & vegetable."""
    try:
        # Encode input using the same method from Jupyter
        district_code = city_encoder.transform([request.district.lower()])[0]
        vegetable_code = crop_encoder.transform([request.vegetable.lower()])[0]

        # Get last known prices from dataset
        df_filtered = df[(df["Commodity"] == request.vegetable.lower()) & 
                         (df["Market Region"] == request.district.lower())]
        
        if df_filtered.empty:
            return {"error": "No data available for this commodity and region"}

        df_filtered = df_filtered.sort_values("Date")

        # 🛠 FIX: Get the last available date from the dataset
        last_date = df_filtered["Date"].max()  # Get last recorded date
        future_dates = [(last_date + timedelta(weeks=i+1)).strftime("%Y-%m-%d") for i in range(12)]  # Start from last date

        # Ensure 'Price_Scaled' column is available before use
        if "Price_Scaled" not in df_filtered.columns:
            return {"error": "'Price_Scaled' column is missing. Ensure price scaling is applied."}

        last_prices = df_filtered["Price_Scaled"].values[-12:]  # Use last 12 real values
        last_prices = last_prices.reshape((1, 12, 1))  # Ensure correct shape

        # Predict next 12 weeks sequentially
        predicted_prices_scaled = []
        for _ in range(12):
            prediction = model.predict(last_prices)[0][0]
            predicted_prices_scaled.append(prediction)

            # Shift the input for next prediction
            last_prices = np.roll(last_prices, shift=-1, axis=1)
            last_prices[0, -1, 0] = prediction  # Replace last value with new prediction

        # Convert scaled predictions back to real prices
        predicted_prices = scaler_price.inverse_transform(np.array(predicted_prices_scaled).reshape(-1, 1)).flatten()

        # Format response
        forecast = [{"date": future_dates[i], "predicted_price": round(float(predicted_prices[i]), 2)} for i in range(12)]

        return {"forecast": forecast}

    except Exception as e:
        return {"error": str(e)}
