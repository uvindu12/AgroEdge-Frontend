import pandas as pd
import psycopg2
from db import get_connection

def generate_recommendations(session_id: int, kpi_data: dict, crop_type: str) -> list:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM sessions WHERE id = %s", (session_id,))
    current = cur.fetchone()
    if not current:
        return ["Session not found"]

    colnames = [desc[0] for desc in cur.description]
    current_data = dict(zip(colnames, current))

    peer_df = pd.read_sql("""
        SELECT * FROM sessions
        WHERE crop_type = %s AND final_performance_score IS NOT NULL
    """, conn, params=(crop_type,))
    conn.close()

    if peer_df.empty:
        return ["Not enough peer data available"]

    peer_df["Yield per Perch"] = peer_df["actual_harvest"] / (peer_df["farm_size"] + 1e-6)
    peer_df["Cost per kg"] = (
        peer_df["seed_cost"] + peer_df["irrigation_cost"] + peer_df["labor_wages"]
    ) / (peer_df["actual_harvest"] + 1e-6)
    peer_df["Fertilizer Efficiency"] = peer_df["actual_harvest"] / (peer_df["water_usage"] + 1e-6)
    peer_df["Pesticide Efficiency"] = peer_df["actual_harvest"] / (peer_df["water_usage"] + 1e-6)
    peer_df["Water Efficiency"] = peer_df["actual_harvest"] / (peer_df["water_usage"] + 1e-6)
    peer_df["Labor Efficiency"] = peer_df["actual_harvest"] / (peer_df["labor_hours"] + 1e-6)
    peer_df["Seed Efficiency"] = peer_df["actual_harvest"] / (peer_df["seed_quantity"] + 1e-6)

    current_vals = {
        "Yield per Perch": current_data["actual_harvest"] / (current_data["farm_size"] + 1e-6),
        "Cost per kg": (
            current_data["seed_cost"] + current_data["irrigation_cost"] + current_data["labor_wages"]
        ) / (current_data["actual_harvest"] + 1e-6),
        "Fertilizer Efficiency": current_data["actual_harvest"] / (current_data["water_usage"] + 1e-6),
        "Pesticide Efficiency": current_data["actual_harvest"] / (current_data["water_usage"] + 1e-6),
        "Water Efficiency": current_data["actual_harvest"] / (current_data["water_usage"] + 1e-6),
        "Labor Efficiency": current_data["actual_harvest"] / (current_data["labor_hours"] + 1e-6),
        "Seed Efficiency": current_data["actual_harvest"] / (current_data["seed_quantity"] + 1e-6),
    }

    peer_means = peer_df[list(current_vals.keys())].mean()
    recommendations = []

    for metric, value in current_vals.items():
        peer_avg = peer_means[metric]
        if metric == "Cost per kg" and value > peer_avg:
            diff = round((value - peer_avg) / peer_avg * 100, 1)
            recommendations.append(f"{metric} is {diff}% higher than average. Consider reducing costs.")
        elif value < peer_avg:
            diff = round((peer_avg - value) / peer_avg * 100, 1)
            recommendations.append(f"{metric} is {diff}% lower than average. You can improve this metric.")

    # Suggest categorical improvements
    best_practices = peer_df.groupby("crop_type").agg({
        "seed_source": lambda x: x.mode()[0],
        "soil_type": lambda x: x.mode()[0],
        "irrigation_method": lambda x: x.mode()[0],
        "veg_variety": lambda x: x.mode()[0]
    }).loc[crop_type]

    for field, best_value in best_practices.items():
        current_value = current_data.get(field)
        if current_value and current_value != best_value:
            recommendations.append(f"Switch {field.replace('_', ' ')} to '{best_value}' for better results.")

    return recommendations
