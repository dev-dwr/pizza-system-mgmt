#!/usr/bin/env bash

# fail on any error
set -e

# make sure the containers that are in the compose script are stopped
docker-compose down -v
docker-compose rm -v

# Build the top-level project in order to have updated versions of the dependencies in our .jar
#  but skip the tests to save some time. We should be allowed to assume these tests have run before the
#  integration-tests are run.
(cd ../ && mvn clean install -DskipTests)

docker-compose build
docker-compose up --force-recreate

#cleanup, delete the volume too
docker-compose down -v