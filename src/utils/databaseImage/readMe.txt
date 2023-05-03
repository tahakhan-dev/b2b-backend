 STEPS FOR MASTER SLAVE DB REPLICATION 
=======================================

version: '2.1'
services:
  pg-0:
    image: docker.io/bitnami/postgresql-repmgr:11
    ports:
      - 5432
    volumes:
      - pg_0_data:/bitnami/postgresql
    environment:
      - POSTGRESQL_POSTGRES_PASSWORD=adminpassword
      - POSTGRESQL_USERNAME=customuser
      - POSTGRESQL_PASSWORD=custompassword
      - POSTGRESQL_DATABASE=customdatabase
      - POSTGRESQL_NUM_SYNCHRONOUS_REPLICAS=1
      - REPMGR_PASSWORD=repmgrpassword
      - REPMGR_PRIMARY_HOST=pg-0
      - REPMGR_PARTNER_NODES=pg-0,pg-1
      - REPMGR_NODE_NAME=pg-0
      - REPMGR_NODE_NETWORK_NAME=pg-0
  pg-1:
    image: docker.io/bitnami/postgresql-repmgr:11
    ports:
      - 5432
    volumes:
      - pg_1_data:/bitnami/postgresql
    environment:
      - POSTGRESQL_POSTGRES_PASSWORD=adminpassword
      - POSTGRESQL_USERNAME=customuser
      - POSTGRESQL_PASSWORD=custompassword
      - POSTGRESQL_DATABASE=customdatabase
      - POSTGRESQL_NUM_SYNCHRONOUS_REPLICAS=1
      - REPMGR_PASSWORD=repmgrpassword
      - REPMGR_PRIMARY_HOST=pg-0
      - REPMGR_PARTNER_NODES=pg-0,pg-1
      - REPMGR_NODE_NAME=pg-1
      - REPMGR_NODE_NETWORK_NAME=pg-1
  pgpool:
    image: docker.io/bitnami/pgpool:4
    ports:
      - 5432:5432
    environment:
      - PGPOOL_BACKEND_NODES=0:pg-0:5432,1:pg-1:5432
      - PGPOOL_SR_CHECK_USER=customuser
      - PGPOOL_SR_CHECK_PASSWORD=custompassword
      - PGPOOL_ENABLE_LDAP=no
      - PGPOOL_POSTGRES_USERNAME=postgres
      - PGPOOL_POSTGRES_PASSWORD=adminpassword
      - PGPOOL_ADMIN_USERNAME=admin
      - PGPOOL_ADMIN_PASSWORD=adminpassword
      - PGPOOL_ENABLE_LOAD_BALANCING=yes

    healthcheck:
      test: ["CMD", "/opt/bitnami/scripts/pgpool/healthcheck.sh"]
      interval: 10s
      timeout: 5s
      retries: 5
volumes:
  pg_0_data:
    driver: local
  pg_1_data:
    driver: local

This docker-compose.yml file defines a multi-container application that consists of two PostgreSQL nodes with replication (pg-0 and pg-1) and a Pgpool-II node acting as a load balancer.


1)  version: '2.1' specifies the version of the Docker Compose file format used in this file.
2)  services section defines three services, each with its own container.
3)  pg-0 and pg-1 are PostgreSQL nodes with replication using the Bitnami PostgreSQL Replication Manager image. Each node is defined with the following properties:

    * image specifies the Docker image to use.
    * ports specifies the port mappings between the container and the host.
    * volumes maps the /bitnami/postgresql directory in the container to persistent volumes pg_0_data and pg_1_data on the host file system.
    * environment sets various environment variables that configure the container, including PostgreSQL and Replication Manager settings such as the username, password, and database name.

4)  pgpool is a Pgpool-II node acting as a load balancer for the PostgreSQL nodes. It is defined with the following properties:

    * image specifies the Docker image to use.
    * ports specifies the port mappings between the container and the host.
    * environment sets various environment variables that configure the container, including the backend nodes, load balancing, and authentication settings.
    * healthcheck specifies a health check for the container, using a shell script located at /opt/bitnami/scripts/pgpool/healthcheck.sh.

5)  volumes section defines two volumes used by the PostgreSQL nodes to store their data (pg_0_data and pg_1_data). These volumes are created as Docker-managed volumes with the local driver.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  The extra.conf file is not related to the docker-compose.yml file, but it contains additional PostgreSQL configuration settings:

  *)  log_destination specifies where log messages should be sent (to both syslog and stderr in this case).
  *)  log_statement enables logging of all SQL statements executed by clients.
  *)  log_per_node_statement enables logging of SQL statements executed by replication nodes.
  *)  log_client_messages enables logging of messages sent from clients to the server.






