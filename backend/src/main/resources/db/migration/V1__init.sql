create table if not exists schema_history_marker (
    id bigint generated always as identity primary key,
    created_at timestamptz not null default now()
);
