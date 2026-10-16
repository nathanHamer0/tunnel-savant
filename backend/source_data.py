from pybaseball import statcast

data = statcast(
    start_dt="2026-03-25",
    end_dt="2026-09-28"
)

data.to_csv("raw_data.csv", index=False)