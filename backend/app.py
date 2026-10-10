
# --- Deployment configuration --- [AI-GEN]

import pickle
from flask import Flask, jsonify
from flask_cors import CORS
from pack import TunnelPairsPack, AggregateTunnelPairsPack
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROFILES_PATH = os.path.join(BASE_DIR, "profiles.pkl")

app = Flask(__name__)
CORS(app, origins=os.environ.get("FRONTEND_ORIGIN", "*"))
 
# --- Bulk load & process at startup --- 
 
with open(PROFILES_PATH, "rb") as f:
    profiles = pickle.load(f)
 
atp_pack = AggregateTunnelPairsPack(profiles)
atp_pack.percentalize()
tp_pack = TunnelPairsPack(profiles)
tp_pack.percentalize()

def player_exists(player_name):
    """Returns boolean of whether the given player exists in the database."""
    return player_name in profiles
 
def find_player_value(data, player_name):
    """Scans parameter-specified pack for given player and returns the percentile and frequency values within a tuple. [AI-GEN]"""
    for name, percentile, frequency in data:
        if name == player_name:
            return (percentile, frequency)

def get_team(player_name):
    """Returns team of specified player."""
    return profiles[player_name]["team"]

def get_aggregate_tunnel_pairs(player_name):
    """Returns 1D aggregate tunnel pair pack for specified player. [AI-GEN]"""
    result = {}
    for atp_key in atp_pack.data:
        value = find_player_value(atp_pack.get_data(atp_key), player_name)
        result[atp_key] = value
    return result

def get_tunnel_pairs(player_name):
    """Returns 2D tunnel pair pack for specified player. [AI-GEN]"""
    result = {}
    for pt_a in tp_pack.data:
        row = {}
        for pt_b in tp_pack.data[pt_a]:
            value = find_player_value(tp_pack.get_data(pt_a, pt_b), player_name)
            row[pt_b] = value
        result[pt_a] = row
    return result

@app.route("/api/player/<player_name>/data")
def get_all_data(player_name):
    """Returns dictionary of all tunnel pair packs for specified player, along with miscellanious data (e.g., team)."""
    if player_exists(player_name):
        return jsonify({"player-name": player_name, "team-name": get_team(player_name), "aggregate-tunnel-pairs": get_aggregate_tunnel_pairs(player_name), "tunnel-pairs": get_tunnel_pairs(player_name)})
    return jsonify("PlayerNotFound")
 
if __name__ == "__main__":
    app.run(debug=True, port=5001)