import threading
import psycopg2
import select
import os
import json
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from kpi_compute import compute_all_normalized_kpis

load_dotenv()
app = FastAPI()
DATABASE_URL = os.getenv("DATABASE_URL")

@app.post("/receive-kpi")
async def receive_kpi(data: Request):
    body = await data.json()
    print("Received KPI Data:")
    print(json.dumps(body, indent=2))
    return {"status": "Received successfully"}

# Background listener for new session insert triggers
def listen_for_notifications():
    conn = psycopg2.connect(DATABASE_URL)
    conn.set_isolation_level(psycopg2.extensions.ISOLATION_LEVEL_AUTOCOMMIT)
    cur = conn.cursor()
    cur.execute("LISTEN new_session;")
    print("Listening for new session inserts...")

    while True:
        if select.select([conn], [], [], 5) == ([], [], []):
            continue
        conn.poll()
        while conn.notifies:
            notify = conn.notifies.pop(0)
            try:
                session_id = int(notify.payload)
                print(f"Computing KPIs for session ID: {session_id}")
                result = compute_all_normalized_kpis(session_id)
                print("Sending KPI result to frontend...")
                requests.post("http://localhost:8000/receive-kpi", json=result)
            except Exception as e:
                print(f"Error: {e}")

def start_listener_in_background():
    thread = threading.Thread(target=listen_for_notifications, daemon=True)
    thread.start()

start_listener_in_background()
