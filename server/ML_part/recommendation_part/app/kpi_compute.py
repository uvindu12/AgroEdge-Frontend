import pandas as pd
import numpy as np
from db import get_connection
from recommendation import generate_recommendations

# Normalize KPI values using Z-score method (scaled to mean=50, std=10)
def z_score_normalization(values, inverse=False):
    mean_val = values.mean()
    std_dev = values.std()
    if std_dev == 0:
        return np.full(len(values), 50)
    z_scores = (values - mean_val) / std_dev
    if inverse:
        z_scores = -z_scores
    return 50 + (z_scores * 10)

# Main function to calculate and store normalized KPIs for a given session
def compute_all_normalized_kpis(farm_id: int):
    conn = get_connection()
    cur = conn.cursor()

    # Get current session data
    session_query = """
    SELECT id, crop_type, farm_size, actual_harvest, seed_quantity,
           water_usage, labor_hours, seed_cost, irrigation_cost, labor_wages
    FROM sessions
    WHERE id = %s
    """
    current_df = pd.read_sql(session_query, conn, params=(farm_id,))
    if current_df.empty:
        return {"error": "Farm session not found"}
    crop_type = current_df.iloc[0]["crop_type"]

    # Get all peer sessions with the same crop type
    peer_query = """
    SELECT s.id, s.farm_size, s.actual_harvest, s.seed_quantity,
           s.water_usage, s.labor_hours,
           s.seed_cost, s.irrigation_cost, s.labor_wages,
           COALESCE(f.total_fert_quantity, 0) AS fertilizer_quantity,
           COALESCE(f.total_fert_cost, 0) AS fertilizer_cost,
           COALESCE(p.total_pest_quantity, 0) AS pesticide_quantity,
           COALESCE(p.total_pest_cost, 0) AS pesticide_cost
    FROM sessions s
    LEFT JOIN (
        SELECT session_id, SUM(quantity) AS total_fert_quantity, SUM(cost) AS total_fert_cost
        FROM fertilizer_uploads GROUP BY session_id
    ) f ON s.id = f.session_id
    LEFT JOIN (
        SELECT session_id, SUM(quantity) AS total_pest_quantity, SUM(cost) AS total_pest_cost
        FROM pesticide_uploads GROUP BY session_id
    ) p ON s.id = p.session_id
    WHERE s.crop_type = %s
    """
    peer_df = pd.read_sql(peer_query, conn, params=(crop_type,))
    if peer_df.empty:
        return {"error": "No peer data found"}

    # Compute raw KPIs
    peer_df["Yield per Perch"] = peer_df["actual_harvest"] / (peer_df["farm_size"] + 1e-6)
    peer_df["Cost per kg"] = (
        peer_df["seed_cost"] + peer_df["fertilizer_cost"] + peer_df["pesticide_cost"] +
        peer_df["irrigation_cost"] + peer_df["labor_wages"]
    ) / (peer_df["actual_harvest"] + 1e-6)
    peer_df["Fertilizer Efficiency"] = peer_df["actual_harvest"] / (peer_df["fertilizer_quantity"] + 1e-6)
    peer_df["Pesticide Efficiency"] = peer_df["actual_harvest"] / (peer_df["pesticide_quantity"] + 1e-6)
    peer_df["Water Efficiency"] = peer_df["actual_harvest"] / (peer_df["water_usage"] + 1e-6)
    peer_df["Labor Efficiency"] = peer_df["actual_harvest"] / (peer_df["labor_hours"] + 1e-6)
    peer_df["Seed Efficiency"] = peer_df["actual_harvest"] / (peer_df["seed_quantity"] + 1e-6)

    # Define KPIs and weights
    kpis = [
        "Yield per Perch", "Cost per kg", "Fertilizer Efficiency",
        "Pesticide Efficiency", "Water Efficiency", "Labor Efficiency", "Seed Efficiency"
    ]
    inverse_kpis = {"Cost per kg": True}
    weights = {
        "Yield per Perch": 30,
        "Cost per kg": 20,
        "Fertilizer Efficiency": 15,
        "Pesticide Efficiency": 10,
        "Water Efficiency": 8,
        "Labor Efficiency": 10,
        "Seed Efficiency": 7,
    }

    # Normalize scores
    kpi_scores = {}
    for kpi in kpis:
        norm = z_score_normalization(peer_df[kpi], inverse=inverse_kpis.get(kpi, False))
        peer_df[f"{kpi}_score"] = norm

    # Extract current session's scores
    current_scores = peer_df[peer_df["id"] == farm_id].iloc[0]
    for kpi in kpis:
        kpi_scores[kpi] = round(current_scores[f"{kpi}_score"], 2)

    final_score = round(sum((kpi_scores[k] * weights[k]) / 100 for k in weights), 2)

    # Store back to database
    update_query = """
    UPDATE sessions SET
        yield_per_perch = %s,
        cost_per_kg = %s,
        fertilizer_efficiency = %s,
        pesticide_efficiency = %s,
        water_efficiency = %s,
        labor_efficiency = %s,
        seed_efficiency = %s,
        final_performance_score = %s,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = %s
    """
    cur.execute(update_query, (
        float(kpi_scores["Yield per Perch"]),
        float(kpi_scores["Cost per kg"]),
        float(kpi_scores["Fertilizer Efficiency"]),
        float(kpi_scores["Pesticide Efficiency"]),
        float(kpi_scores["Water Efficiency"]),
        float(kpi_scores["Labor Efficiency"]),
        float(kpi_scores["Seed Efficiency"]),
        float(final_score),
        farm_id
    ))
    conn.commit()
    cur.close()
    conn.close()

    # Get personalized recommendations
    recommendations = generate_recommendations(farm_id, kpi_scores, crop_type)

    return {
        "farm_id": int(farm_id),
        "final_score": final_score,
        "kpis": {
            kpi: {
                "score": kpi_scores[kpi],
                "weight": float(weights[kpi]),
                "weighted_contribution": round((kpi_scores[kpi] * weights[kpi]) / 100, 2)
            } for kpi in kpis
        },
        "recommendations": recommendations
    }
