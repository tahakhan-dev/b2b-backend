#!/bin/bash
set -e

if [ "$POSTGRES_REPLICATION_MODE" = "master" ]; then
  echo "Creating replication user and configuring master..."
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $POSTGRES_REPLICATION_USER WITH REPLICATION PASSWORD '$POSTGRES_REPLICATION_PASSWORD';
    ALTER SYSTEM SET wal_level = 'replica';
    ALTER SYSTEM SET max_wal_senders = 10;
    ALTER SYSTEM SET wal_keep_segments = 10;
    ALTER SYSTEM SET listen_addresses = '*';
  EOSQL
  pg_ctl reload
else
  echo "Configuring slave replication..."
  until pg_isready -h "$POSTGRES_MASTER_HOST" -p 5432; do
    echo "Waiting for master to start..."
    sleep 1
  done
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $POSTGRES_REPLICATION_USER WITH REPLICATION PASSWORD '$POSTGRES_REPLICATION_PASSWORD';
    SELECT pg_create_physical_replication_slot('$POSTGRES_REPLICATION_USER');
    SELECT pg_start_replication('$POSTGRES_REPLICATION_USER');
  EOSQL
fi