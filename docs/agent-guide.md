# Agent Guide

This guide is for AI coding agents and contributors that need to understand Argus quickly before changing the repository.

## Project Intent

Argus is an AI/Cloud Governance Platform. Treat cost risk, sensitive data exposure, and policy violations as one governance workflow built around findings, violations, notifications, exceptions, and audit logs.

Do not narrow the product into only a cost dashboard or only a security scanner unless the user explicitly changes the product direction.

## Repository Structure

```text
backend/             Kotlin + Spring Boot backend
frontend/            Vite + React admin console
infra/terraform/     Planned GCP infrastructure definitions
docs/                Product, architecture, policy, and agent documentation
docker-compose.yml   Local PostgreSQL + Redpanda environment
```

## Local Commands

Start local infrastructure:

```bash
docker compose up -d
```

Run backend:

```bash
cd backend
./gradlew bootRun --args='--spring.profiles.active=local'
```

Run backend tests:

```bash
cd backend
./gradlew test
```

Run frontend:

```bash
cd frontend
npm run dev
```

Build frontend:

```bash
cd frontend
npm run build
```

Validate Docker Compose:

```bash
docker compose config
```

## Messaging Rules

Local development uses Redpanda through Kafka-compatible APIs. GCP target architecture uses Pub/Sub.

When adding backend event code:

- Put domain behavior behind broker-neutral ports.
- Keep Kafka/Redpanda and Pub/Sub code in infrastructure adapters.
- Do not let domain services depend directly on KafkaTemplate, Pub/Sub clients, or provider SDKs.
- Design consumers to be idempotent because message redelivery is expected.
- Keep dead-letter behavior explicit and observable.

## Provider Rules

v1 priority providers:

- Claude
- OpenAI
- GCP

Extension providers:

- AWS
- Azure

Provider adapters should normalize payloads into Argus concepts. Do not scatter provider-specific fields through domain services or frontend state unless they are intentionally displayed as source metadata.

## Data Handling Rules

Follow `docs/service-policy.md`.

Important defaults:

- Raw evidence TTL is 30 days.
- Raw evidence requires encryption, access control, and audit logging.
- Long-term storage should keep masked sample, hash/fingerprint, source, resource id, finding type, severity, and timestamps.
- Do not log full prompts, full provider payloads, full secrets, or unmasked personal data.
- Notifications must not contain raw sensitive values.

## Documentation Rules

Documentation should use English as the main body and include a Korean summary section.

When changing architecture or policy behavior, update the relevant docs in the same change:

- Product scope: `docs/product-brief.md`
- Runtime/data flow: `docs/architecture.md`
- Data/security/retention behavior: `docs/service-policy.md`
- Agent workflow or commands: `docs/agent-guide.md`
- Entry point or changed commands: `README.md`

## AI-Assisted Engineering

AI may help generate test scenarios, identify PR risk areas, and summarize CI failures. AI output is advisory. Tests, review, and explicit maintainer decisions are authoritative.

## Do Not Do

- Do not store unmasked sensitive raw data indefinitely.
- Do not add automatic real provider spend blocking in the MVP.
- Do not present Argus as a SIEM, DLP, CSPM, or legal compliance product.
- Do not introduce a new runtime service without updating architecture docs.
- Do not couple domain logic directly to Redpanda, Kafka, Pub/Sub, or a provider SDK.
- Do not commit local secrets, `.env` files, generated build output, or Terraform state.

## Korean Summary

이 문서는 AI 에이전트와 기여자가 Argus를 빠르게 이해하기 위한 작업 가이드입니다. Argus는 비용, 민감정보 노출, 정책 위반을 하나의 finding/violation 흐름으로 다루는 AI/Cloud Governance Platform입니다. 로컬은 Redpanda, GCP 목표는 Pub/Sub을 사용하므로 도메인 로직은 broker-neutral port에 의존해야 합니다. 문서는 영어 본문과 한국어 요약을 함께 유지하고, 데이터 정책은 `docs/service-policy.md`의 30일 원문 보관, 암호화, 접근 제어, 감사 로그 원칙을 따라야 합니다.
