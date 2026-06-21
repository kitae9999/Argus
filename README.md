# Argus

Argus is an AI and cloud governance platform for tracking cost, sensitive data exposure, and policy violations across modern infrastructure.

## Stack

- Backend: Kotlin, Spring Boot, Gradle
- Frontend: Vite, React, TypeScript
- Local infrastructure: PostgreSQL, Redpanda, Redpanda Console
- Cloud target: Cloud Run, Cloud SQL, Pub/Sub, Cloud Tasks, Firebase Hosting

## Local Development

Start local infrastructure:

```bash
docker compose up -d
```

Run backend:

```bash
cd backend
./gradlew bootRun --args='--spring.profiles.active=local'
```

Run frontend:

```bash
cd frontend
npm run dev
```

Default local endpoints:

- Backend API: http://localhost:8080
- Frontend: http://localhost:5173
- Redpanda Console: http://localhost:8081
- PostgreSQL: localhost:5432

## Messaging Strategy

Local development uses Redpanda through Kafka-compatible APIs. The GCP target uses Pub/Sub. Application code should depend on domain event ports instead of directly depending on Kafka or Pub/Sub clients, so broker-specific behavior stays in infrastructure adapters.
