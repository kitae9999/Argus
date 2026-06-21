# Argus Architecture

Argus is split into a Spring Boot backend, a Vite React admin console, and infrastructure definitions.

## Runtime Shape

- Local: Spring Boot + PostgreSQL + Redpanda
- GCP: Cloud Run + Cloud SQL + Pub/Sub + Cloud Tasks + Firebase Hosting

## Eventing

The application should expose broker-neutral ports such as `DomainEventPublisher` and broker-specific adapters for Kafka-compatible Redpanda and GCP Pub/Sub.

Initial event topics:

- `raw-usage-events`
- `normalized-usage-events`
- `policy-violation-events`
- `notification-requested-events`
- `dead-letter-events`
