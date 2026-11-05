# Tunnel Savant

A baseball pitcher tunnel analyzer inspired by Baseball Savant and mlbpitchprofiler.com.

## Functionality

Tunnel Savant evaluates a pitcher's tunnel tendencies using:

- Pitch-tunneling frequencies (ABtunnel%)
- Pitch-tunneling percentiles (derived from frequencies and relative to rest of league)

It outputs:

- Normalized (percentalized) tunnel tendencies

## Methodology

Tunnel Savant defines a tunnel as follows:

- From a, v, d, t parameters
- Models pitch-tunneling by detecting pitch-pairs' (shared) paths across several calculated trajectory pings up until batter decision-point

## Motivation

I wanted to build a web-application to view percentalized pitcher profiles (à la Baseball Savant, mlbpitchprofiler.com), but in terms of tunnel-metrics (i.e., the "how") rather than performance-metrics (i.e., the "what").

## Tech stack

### Languages

- CSS
- JavaScript (JSX)
- Python
- SQL

### Frameworks

- pytest
  - unittest.mock

### Python Libraries

- pandas

## Challenges

- SQL and JSX learning curves

## Live demo

- https://tunnel-savant-web.onrender.com/
- Initial query might take up to a minute as render service takes time to wake up.

## Project Structure

backend/
├── source_data.py
├── parse_data.py
├── profiler.py
├── processer.py
├── comparer.py
├── data/
├──── parse_data.sql
├──── ...
├── tests/
├──── ...
src/
├── ...
...

## Build Instructions

- Specify for sample of pitch-level data in backend/source_data.py using statcast(start_dt="YYYY-MM-DD",end_dt="YYYY-MM-DD").

```bash
TunnelSavant % python backend/source_data.py
TunnelSavant % python backend/parse_data.py
TunnelSavant % python backend/profiler.py
```

** Move profiles.pkl into backend/ from TunnelSavant/ **

```bash
TunnelSavant % python backend/app.py
TunnelSavant % npm run dev
```

## Future improvements

- Add other metrics to profile dashboard
- Refine pitch-tunneling frequency logic/calculation
- Train machine learning model to infer a pitcher's ERA from their tunneling freqeuncies
- Complete/refine testing modules
