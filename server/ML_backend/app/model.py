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
    """Predicts price for the selected vegetable and other 19 vegetables in the same district."""
    try:
        # Convert input to lowercase and validate
        district_lower = request.district.strip().lower()
        vegetable_lower = request.vegetable.strip().lower()

        if district_lower not in city_encoder.classes_ or vegetable_lower not in crop_encoder.classes_:
            return {"error": "Invalid district or vegetable"}

        # Get all vegetables grown in the district
        vegetables_in_district = df[df["Market Region"] == district_lower]["Commodity"].unique()
        
        # Ensure selected vegetable is in the district list
        if vegetable_lower not in vegetables_in_district:
            return {"error": "Selected vegetable is not recorded in this district"}

        # Get last recorded date
        df_filtered = df[df["Market Region"] == district_lower].sort_values("Date")
        last_date = df_filtered["Date"].max()
        future_dates = [(last_date + timedelta(weeks=i+1)).strftime("%Y-%m-%d") for i in range(12)]
        
        # Function to get prediction for a given vegetable
        def get_forecast(veg_name):
            df_veg = df_filtered[df_filtered["Commodity"] == veg_name]
            if df_veg.empty:
                return None
            
            last_prices = df_veg["Price per Unit (LKR/kg)"].values[-12:]
            if len(last_prices) < 12:
                return None
            
            last_prices_scaled = scaler_price.transform(last_prices.reshape(-1, 1)).reshape((1, 12, 1))
            predicted_prices_scaled = []
            
            for _ in range(12):
                prediction = model.predict(last_prices_scaled)[0][0]
                predicted_prices_scaled.append(prediction)
                last_prices_scaled = np.roll(last_prices_scaled, shift=-1, axis=1)
                last_prices_scaled[0, -1, 0] = prediction
            
            predicted_prices = scaler_price.inverse_transform(
                np.array(predicted_prices_scaled).reshape(-1, 1)
            ).flatten()
            
            return [{"date": future_dates[i], "predicted_price": round(float(predicted_prices[i]), 2)} for i in range(12)]
        
        # Get forecast for selected vegetable
        selected_forecast = get_forecast(vegetable_lower)
        if selected_forecast is None:
            return {"error": "Not enough data for the selected vegetable."}
        
        # Get forecast for other 19 vegetables in the district
        other_forecasts = {}
        for veg in vegetables_in_district:
            if veg != vegetable_lower:
                forecast = get_forecast(veg)
                if forecast is not None:
                    other_forecasts[veg] = forecast
        
        return {
            "district": request.district,
            "selected_vegetable": {
                "name": request.vegetable,
                "forecast": selected_forecast
            },
            "other_vegetables": other_forecasts
        }
    
    except Exception as e:
        return {"error": str(e)}
