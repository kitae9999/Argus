# Argus

Argus is an AI and cloud governance platform for detecting, normalizing, and managing cost risk, sensitive data exposure, and policy violations across modern infrastructure.

The project is designed as an open-source backend portfolio and as an agent-readable codebase. It favors explicit architecture, local reproducibility, and clear technical policies over a production SaaS claim.

## What Argus Does

Argus collects signals from AI providers, cloud billing systems, and security/data scanners, then turns them into a common governance workflow:

```text
Source event -> Normalized record -> Finding -> Violation -> Notification / Exception / Resolution
```

Core capabilities planned for the MVP:

- AI and cloud cost ingestion and aggregation
- Policy evaluation for budget, provider, labeling, and security rules
- Sensitive data exposure detection and evidence handling
- Central Findings Inbox for triage and ownership
- Notification workflow with retry and dead-letter handling
- Audit trail for policy changes, exceptions, and resolution actions

## Provider Strategy

Priority providers for v1:

- Claude
- OpenAI
- GCP

Extension providers:

- AWS
- Azure

Argus should support both real provider adapters and mock/synthetic adapters. Mock and synthetic sources are first-class because they make cost, security, and privacy scenarios testable without spending real cloud or AI API budget.

## Stack

- Backend: Kotlin, Spring Boot, Gradle
- Frontend: Vite, React, TypeScript
- Local messaging: Redpanda through Kafka-compatible APIs
- Cloud messaging target: Google Cloud Pub/Sub
- Local data store: PostgreSQL
- Cloud target: Cloud Run, Cloud SQL, Pub/Sub, Cloud Tasks, Firebase Hosting

## Repository Layout

```text
backend/             Kotlin + Spring Boot backend
frontend/            Vite + React admin console
infra/terraform/     Planned GCP infrastructure definitions
docs/                Product, architecture, policy, and agent documentation
docker-compose.yml   Local PostgreSQL + Redpanda environment
```

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

- Backend API: <http://localhost:8080>
- Frontend: <http://localhost:5173>
- Redpanda Console: <http://localhost:8081>
- PostgreSQL: `localhost:5432`

## Verification

Backend:

```bash
cd backend
./gradlew test
```

Frontend:

```bash
cd frontend
npm run build
```

Local infrastructure config:

```bash
docker compose config
```

## Documentation

- [Product Brief](docs/product-brief.md)
- [Architecture](docs/architecture.md)
- [Service Policy](docs/service-policy.md)
- [Agent Guide](docs/agent-guide.md)

## Data Handling Position

Argus may temporarily store raw provider payloads or evidence when needed for debugging, replay, and auditability. Raw data must be encrypted, access-controlled, audited, and retained for no more than 30 days. Long-term records should keep only masked samples, hashes/fingerprints, source metadata, resource identifiers, finding type, severity, and timestamps.

## AI-Assisted Engineering

AI may be used to draft test scenarios, summarize CI failures, or review PR risk areas. AI output is advisory only. Deterministic tests, code review, and explicit maintainer decisions remain the source of truth.

## Korean Summary

Argus는 AI와 클라우드 사용 과정에서 발생하는 비용 리스크, 민감정보 노출, 정책 위반을 하나의 Finding/Violation 흐름으로 수집하고 관리하는 AI/Cloud Governance 플랫폼입니다. v1은 Claude, OpenAI, GCP를 우선 provider로 보고, AWS와 Azure는 확장 대상으로 둡니다. 로컬은 PostgreSQL과 Redpanda를 사용하고, GCP 배포 목표는 Cloud Run, Cloud SQL, Pub/Sub, Cloud Tasks, Firebase Hosting입니다. 원문 데이터는 필요한 경우에만 암호화해 최대 30일 보관하고, 장기 보관은 마스킹 샘플과 해시 중심으로 제한합니다.
