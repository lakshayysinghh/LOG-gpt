# LogGPT

AI-powered log monitoring and root cause analysis platform.

## Architecture

```
client/          React dashboard (Phase 4+)
server/          Express API, Kafka, OpenAI, Socket.IO
```

## Phase 1 – Current (Log Ingestion API)

- Express + MongoDB (Mongoose)
- REST APIs for log ingestion and retrieval
- MVC: routes → controllers → services → models

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB running locally (`mongodb://localhost:27017`)

### Server

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

### Test the API

```bash
# Health check
curl http://localhost:5000/api/health

# Ingest a log
curl -X POST http://localhost:5000/api/logs \
  -H "Content-Type: application/json" \
  -d "{\"serviceName\":\"payment-service\",\"level\":\"ERROR\",\"message\":\"Database connection timeout\"}"

# List logs
curl http://localhost:5000/api/logs

# Dashboard stats (used in Phase 4)
curl http://localhost:5000/api/logs/stats
```

## Roadmap

| Phase | Feature                          | Status      |
|-------|----------------------------------|-------------|
| 1     | Setup, MongoDB, Basic APIs       | In progress |
| 2     | Kafka integration                | Pending     |
| 3     | OpenAI analysis                  | Pending     |
| 4     | Dashboard                        | Pending     |
| 5     | Socket.IO real-time updates      | Pending     |
