# Architecture

## Overview

Argus is split into a Kotlin/Spring Boot backend, a Vite/React admin console, local infrastructure for development, and GCP-oriented infrastructure definitions.

The core architecture is event-driven:

```text
Provider adapter
  -> raw event
  -> normalizer
  -> normalized governance record
  -> policy evaluator
  -> finding / violation
  -> notification / exception / resolution
  -> audit log
```

The same application model should work with local Redpanda and cloud Pub/Sub by keeping broker-specific code in infrastructure adapters.

## Runtime Shape

Local development:

- Spring Boot backend
- PostgreSQL
- Redpanda through Kafka-compatible APIs
- Redpanda Console
- Vite dev server

GCP target:

- Cloud Run for API and workers
- Cloud SQL for PostgreSQL
- Pub/Sub for cloud event transport
- Cloud Tasks for notification retry and delayed delivery
- Firebase Hosting for the Vite admin console
- Secret Manager for provider credentials and webhook secrets
- Cloud Logging, Monitoring, and Trace for observability

## Major Components

Backend API:

- Handles organization, policy, finding, violation, and audit APIs
- Accepts provider import requests and synthetic scenario inputs
- Publishes domain events through event ports

Provider adapters:

- Claude, OpenAI, and GCP are the v1 priority providers
- AWS and Azure are extension providers
- Adapters may be real, mock, or synthetic
- All adapters must produce normalized raw events without leaking provider-specific details into domain services

Normalizer workers:

- Convert provider-specific payloads into common governance records
- Preserve raw evidence references when retention policy allows it
- Attach source, resource, owner, severity, timestamps, and idempotency metadata

Policy evaluator:

- Evaluates cost, data, AI usage, and cloud security policies
- Produces findings and violations
- Keeps policy decisions auditable and replayable when practical

Notification worker:

- Sends Slack/email/webhook-style notification events
- Uses retry and dead-letter handling
- Records delivery attempts for auditability

Admin console:

- Shows overview metrics, findings inbox, policy views, cost views, and audit history
- Acts as a thin client over backend APIs

## Eventing Strategy

Argus uses Redpanda locally and Pub/Sub in GCP.

Redpanda is used locally because it is Kafka-compatible, easy to run through Docker Compose, and useful for validating producer, consumer, topic, retry, and DLQ concepts.

Pub/Sub is the GCP target because it avoids operating Kafka brokers and integrates naturally with Cloud Run workers.

Application code should depend on event ports rather than concrete broker clients:

```text
DomainEventPublisher
DomainEventHandler
EventEnvelope
EventTopic
```

Broker-specific adapters map these abstractions to Redpanda/Kafka or Pub/Sub. Idempotency and duplicate handling should be enforced at the application/database level because both Kafka-compatible brokers and Pub/Sub can redeliver messages.

Initial event topics:

- `raw-usage-events`
- `normalized-usage-events`
- `policy-violation-events`
- `notification-requested-events`
- `dead-letter-events`

## Data Model Direction

The MVP should model these concepts explicitly:

- Organization, team, project, and provider account
- Raw event and evidence reference
- Normalized governance record
- Policy and policy version
- Finding and violation
- Exception, triage, resolution, and remediation task
- Notification and notification delivery attempt
- Audit log

Raw payloads and evidence must follow the service policy. Long-term tables should avoid storing unmasked secrets, prompts, or personal data.

## Cloud Mapping

```text
Cloud Run API
  -> Cloud SQL
  -> Pub/Sub raw events
  -> Cloud Run normalizer worker
  -> Pub/Sub normalized events
  -> Cloud Run policy worker
  -> Pub/Sub notification events
  -> Cloud Tasks notification retry
```

Firebase Hosting serves the React admin console. API calls can target Cloud Run directly or be routed through hosting rewrites in a later deployment phase.

## Korean Summary

Argus는 Spring Boot 백엔드, Vite/React 콘솔, 로컬 인프라, GCP 배포 목표로 구성됩니다. 로컬에서는 Redpanda를 Kafka-compatible broker로 사용하고, GCP에서는 Pub/Sub을 사용합니다. 애플리케이션 코드는 `DomainEventPublisher`, `DomainEventHandler` 같은 이벤트 포트에 의존하고, Redpanda와 Pub/Sub 차이는 인프라 어댑터에 격리합니다. 핵심 흐름은 provider adapter -> raw event -> normalizer -> policy evaluator -> finding/violation -> notification/audit log입니다.
