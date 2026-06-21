# Product Brief

## Product Positioning

Argus is an AI/Cloud Governance Platform. It helps engineering teams detect and manage cost risk, sensitive data exposure, and policy violations across AI providers and cloud infrastructure.

Argus does not try to be a complete FinOps platform, SIEM, DLP product, or cloud security posture management suite. The MVP focuses on a smaller but meaningful backend problem: turning heterogeneous provider signals into a consistent governance workflow that can be tested, audited, and extended.

## Problem

Modern engineering teams use AI APIs, cloud services, storage systems, and security tooling across multiple providers. The operational risk is fragmented:

- AI usage can spike without team-level visibility.
- Cloud resources can generate unallocated or unexpected cost.
- Prompts, logs, or exported data can include sensitive values.
- Security and data findings often arrive in provider-specific formats.
- Teams need ownership, triage, exceptions, notifications, and audit history in one place.

Argus treats these signals as governance events instead of isolated dashboards.

## Target Users

Primary users:

- Platform engineers who operate shared infrastructure
- Backend engineers who own cost and reliability-sensitive services
- Security or governance engineers who need triage workflows
- Technical leads who need team-level visibility and accountability

Secondary users:

- Open-source contributors who want to understand the architecture
- AI coding agents that need project context before changing code

## MVP Scope

The MVP includes:

- Provider adapters for Claude, OpenAI, and GCP as priority sources
- Mock and synthetic adapters for repeatable local development and tests
- Normalized records for cost, sensitive data, and policy signals
- Findings and violations as the central workflow model
- Policy evaluation for cost thresholds, unsupported provider usage, missing ownership metadata, and sensitive data exposure
- Notification events with retry and dead-letter handling
- Audit logs for policy, exception, triage, and resolution actions
- Admin console views for overview, findings, policies, costs, and audit history

## Out of Scope for MVP

The MVP does not include:

- Blocking real payments or provider usage automatically
- Replacing a SIEM, DLP, CSPM, or full FinOps suite
- Complete real-time integration for every provider
- Long-term storage of unmasked raw prompts, logs, or secrets
- Automated remediation without explicit policy and audit controls

## Success Criteria

Argus is successful as a portfolio and open-source project if a reader can see:

- A clear domain model for governance findings and violations
- A backend pipeline with ingestion, normalization, policy evaluation, notification, and audit boundaries
- A local-first development environment that exercises event-driven flows
- A cloud target architecture that maps cleanly to GCP managed services
- Explicit privacy and evidence-handling policies

## Korean Summary

Argus는 AI/Cloud Governance Platform으로, AI provider와 클라우드 인프라에서 발생하는 비용 리스크, 민감정보 노출, 정책 위반을 하나의 거버넌스 흐름으로 관리합니다. MVP는 Claude, OpenAI, GCP를 우선 대상으로 하며, mock/synthetic adapter를 통해 실제 비용 없이도 수집, 정규화, 정책 평가, 알림, 감사 로그를 검증할 수 있게 합니다. 초기 범위에는 실제 결제 차단, SIEM/DLP 대체, 모든 provider의 완전한 실시간 연동은 포함하지 않습니다.
