# Service Policy

This document is a technical service policy for the Argus open-source project. It is not a commercial SaaS terms document and is not legal advice.

## Policy Goals

Argus should make governance signals useful without creating unnecessary data risk. The default policy is to collect enough evidence to debug, replay, and audit findings while minimizing long-term retention of sensitive raw content.

## Data Collection

Argus may collect or receive:

- AI usage and cost data from Claude and OpenAI adapters
- Cloud billing, asset, or finding data from GCP adapters
- Synthetic or mock provider events for local development and tests
- Sensitive data detection results from scanner-style adapters
- Policy evaluation results, notifications, exceptions, and audit events

AWS and Azure are extension provider families. They should follow the same adapter and retention rules when added.

## Raw Data and Evidence Retention

Raw provider payloads, prompts, logs, object samples, or security finding payloads are restricted evidence data.

Default retention policy:

- Raw evidence may be stored only when needed for debugging, replay, audit, or policy evaluation.
- Raw evidence must be encrypted at rest.
- Raw evidence must have access control separate from normal metadata reads.
- Raw evidence access must create an audit log entry.
- Raw evidence must expire after 30 days.
- After 30 days, Argus should keep only reduced metadata.

Long-term retained metadata may include:

- Masked sample
- Hash or fingerprint
- Source provider and source account
- Resource identifier
- Field path or evidence location
- Finding type
- Severity
- Detection timestamp
- Owner/team/project mapping
- Policy and policy version

Long-term retained metadata must not include unmasked secrets, full prompts, full logs, or complete personal data values.

## Masking and Fingerprinting

Sensitive values should be masked before they appear in normal application views, logs, notifications, or long-term tables.

Examples:

- API key: `sk-...abcd`
- Email: `ki***@example.com`
- Token: `sha256:<fingerprint>`

Hashes and fingerprints are used for deduplication and correlation. They must not be treated as a substitute for access control when the source value is highly sensitive.

## Access Control

Argus should separate access to:

- Normal finding metadata
- Raw evidence
- Policy configuration
- Exception approval
- Notification configuration
- Audit logs

Raw evidence access should be limited to privileged roles and should be logged. Policy and exception changes should require an authenticated actor and should be traceable in audit history.

## Audit Logging

Argus should audit:

- Policy creation, update, disable, and version changes
- Finding status changes
- Violation assignment and resolution
- Exception grants and expiration
- Raw evidence access
- Notification delivery attempts and failures
- Provider credential or adapter configuration changes

Audit logs should be append-oriented and should not contain unmasked sensitive values.

## Notification Policy

Notifications should include enough context to route work, not enough data to leak secrets.

Allowed notification content:

- Severity
- Finding type
- Team or owner
- Resource identifier or masked reference
- Policy name
- Link to the Argus finding detail page

Disallowed notification content:

- Full prompt text
- Full log payload
- Full API key, token, password, or personal identifier
- Raw provider payloads

Notification failures should be retried and recorded. Repeated failures should move to a dead-letter workflow for operator review.

## Provider Adapter Policy

Provider adapters should normalize provider-specific payloads into Argus records without spreading provider-specific logic into domain services.

Adapters must define:

- Source provider name
- Supported event types
- Idempotency key strategy
- Evidence handling behavior
- Rate limit and retry expectations
- Mock/synthetic behavior for local development

v1 priority adapters are Claude, OpenAI, and GCP. AWS and Azure are extension targets.

## Explicit Non-Goals

Argus does not claim to:

- Block real provider spending automatically
- Replace a SIEM, DLP, CSPM, or commercial FinOps suite
- Provide legal compliance guarantees
- Store unmasked sensitive raw data indefinitely
- Fully integrate every provider in real time in the MVP

## Korean Summary

이 문서는 Argus의 기술 정책입니다. Argus는 실제 SaaS 약관이 아니라 오픈소스 프로젝트의 데이터 수집, 원문 보관, 마스킹, 암호화, 감사 로그, 알림, provider adapter 원칙을 정의합니다. 원문 evidence는 필요한 경우에만 암호화해 최대 30일 보관하며, 접근 제어와 감사 로그가 필수입니다. 30일 이후에는 마스킹 샘플, 해시, source, resource id, finding type, severity, timestamp 같은 메타데이터만 남깁니다. 알림과 감사 로그에는 원문 prompt, 전체 로그, 전체 secret 값을 포함하지 않습니다.
