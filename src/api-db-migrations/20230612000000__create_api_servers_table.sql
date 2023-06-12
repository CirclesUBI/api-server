-- migrate:up
create table "ApiServers" (
                              id serial primary key,
                              "createdAt" timestamp with time zone not null default now(),
                              "instanceId" text not null unique
);

-- migrate:down
