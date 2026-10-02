import pickle
from flask import Flask, jsonify
from flask_cors import CORS
 
from pack import TunnelPairsPack, AggregateTunnelPairsPack
PROFILES_PATH = "backend/profiles.pkl"
app = Flask(__name__)
CORS(app)  # allows requests from React dev server (different port = different origin)
 
# --- Bulk load & process at startup (AI-GEN) --- 
 
with open(PROFILES_PATH, "rb") as f:
    profiles = pickle.load(f)
 
atp_pack = AggregateTunnelPairsPack(profiles)
atp_pack.percentalize()
tp_pack = TunnelPairsPack(profiles)
tp_pack.percentalize()
 
def find_player_value(data, player_name):
    """Scans parameter-specified pack for given player and returns the value."""
    for name, value in data:
        if name == player_name:
            return value

def get_team(player_name):
    """Returns team of specified player."""
    return profiles[player_name]["team"]

def get_aggregate_tunnel_pairs(player_name):
    """Returns 1D aggregate tunnel pair pack for specified player."""
    result = {}
    for atp_key in atp_pack.data:
        value = find_player_value(atp_pack.get_data(atp_key), player_name)
        result[atp_key] = value
    return result

def get_tunnel_pairs(player_name):
    """Returns 2D tunnel pair pack for specified player."""
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
    return jsonify({"player-name": player_name, "team-name": get_team(player_name), "aggregate-tunnel-pairs": get_aggregate_tunnel_pairs(player_name), "tunnel-pairs": get_tunnel_pairs(player_name)})
 
if __name__ == "__main__":
    app.run(debug=True, port=5001)