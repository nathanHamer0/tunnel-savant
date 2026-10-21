# Deployment (Tunnel) Savant

A baseball pitcher deployment analyzer inspired by Baseball Savant and mlbpitchprofiler.com.

## Functionality

Deployment (Tunnel) Savant evaluates a pitcher's deployment tendencies using:

- Pitch-tunneling frequencies (ABtunnel%)
- Pitch-location frequencies (Azone%) [COMING-SOON]
- Other characteristics (e.g., arm-angle)

It outputs:

- Normalized (percentalized) deployment tendencies

## Motivation

I wanted to build a web-application to view percentalized pitcher profiles (à la Baseball Savant, mlbpitchprofiler.com), but in terms of deployment-metrics (i.e., the "how") rather than performance-metrics (i.e., the "what").

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
├── static/
├──── ...
├── data/
├──── parse_data.sql
├──── ...
├── tests/
├──── ...
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

- Build machine learning model to model pitcher deployment (tunnel) similarity
- Complete/refine testing modules

```

```
