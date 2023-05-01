 STEPS FOR MASTER SLAVE DB REPLICATION 
=======================================

1.  Create a directory for your project and create a docker-compose.yml file inside it.
2.  In the docker-compose.yml file, define two services: one for the master database and one for the slave database.
    Use the official PostgreSQL Docker image for both services. For example:


-----------------------------------------------------------------------------------------------------
version: '3'
services:
  db_master:
    image: postgres
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
      POSTGRES_MASTER_USER: myuser
      POSTGRES_MASTER_PASSWORD: mypassword
      POSTGRES_REPLICATION_USER: replicauser
      POSTGRES_REPLICATION_PASSWORD: replicapassword
      POSTGRES_REPLICATION_MODE: master
    volumes:
      - ./data/master:/var/lib/postgresql/data
      - ./create-replication.sh:/docker-entrypoint-initdb.d/create-replication.sh
    ports:
      - "5432:5432"

  db_slave:
    image: postgres
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydb
      POSTGRES_MASTER_HOST: db_master
      POSTGRES_REPLICATION_USER: replicauser
      POSTGRES_REPLICATION_PASSWORD: replicapassword
      POSTGRES_REPLICATION_MODE: slave
    volumes:
      - ./data/slave:/var/lib/postgresql/data
      - ./create-replication.sh:/docker-entrypoint-initdb.d/create-replication.sh
    depends_on:
      - db_master

---------------------------------------------------------------------------------------------------

    In this example, we are passing environment variables to the master or slave database service to configure replication.
    We are also running a Bash script (create-replication.sh) to set up the replication configuration. 
    The script should be placed in the same directory as the docker-compose.yml file.

5.  Create the create-replication.sh file in the same directory as the docker-compose.yml file with the following contents:

-------------------------------------------------------------------------------------------------------------
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
-----------------------------------------------------------------------------------------------------------

This bash script is used to configure PostgreSQL replication for a master-slave setup.
It is executed when the master and slave PostgreSQL containers are started by Docker Compose,
and it performs different actions depending on the value of the POSTGRES_REPLICATION_MODE environment variable.

Here's a detailed breakdown of what this script does:

1.  The first line #!/bin/bash specifies that the script should be executed by the bash shell.
2.  The set -e option tells the shell to exit immediately if any command in the script exits with a non-zero status
3.  The if statement checks the value of the POSTGRES_REPLICATION_MODE environment variable. If it is set to "master", 
    the script executes the following SQL statements:

    *   `CREATE USER $POSTGRES_REPLICATION_USER WITH REPLICATION PASSWORD '$POSTGRES_REPLICATION_PASSWORD';: Creates a replication user with the specified username and password.
    *   `ALTER SYSTEM SET wal_level = 'replica';: Sets the wal_level configuration parameter to 'replica' to enable WAL (Write Ahead Log) replication.
    *   `ALTER SYSTEM SET max_wal_senders = 10;: Sets the max_wal_senders configuration parameter to 10 to allow up to 10 replication connections.
    *   `ALTER SYSTEM SET wal_keep_segments = 10;: Sets the wal_keep_segments configuration parameter to 10 to ensure that the master keeps enough WAL segments to enable replication to catch up
    *   `ALTER SYSTEM SET listen_addresses = '*';: Sets the listen_addresses configuration parameter to '*' to allow incoming connections from any IP address.

These SQL statements configure the master PostgreSQL server for replication.

4.  The pg_ctl reload command reloads the PostgreSQL server configuration to apply the changes made in step 3.
5.  If POSTGRES_REPLICATION_MODE is not set to "master", the script executes the following SQL statements:

    *   `CREATE USER $POSTGRES_REPLICATION_USER WITH REPLICATION PASSWORD '$POSTGRES_REPLICATION_PASSWORD';: Creates a replication user with the specified username and password.
    *   `SELECT pg_create_physical_replication_slot('$POSTGRES_REPLICATION_USER');: Creates a physical replication slot with the specified name
    *   `SELECT pg_start_replication('$POSTGRES_REPLICATION_USER');: Starts replication using the specified replication slot.

    These SQL statements configure the slave PostgreSQL server for replication.

6.  The until loop waits for the master PostgreSQL server to become available. It runs the pg_isready command to check if the server is ready to accept connections. If the server is not ready,
    the loop waits for 1 second and tries again.

7.  Once the master PostgreSQL server is available, the script executes the SQL statements in step 5 to configure the slave for replication

    It is an important part of the configuration for a master-slave PostgreSQL replication setup in Docker Compose.
