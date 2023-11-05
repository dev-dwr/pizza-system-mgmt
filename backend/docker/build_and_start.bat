REM FILEPATH: D:\Projekty\JavaScript\pizza-system-mgmt\backend\docker\build_and_start.bat

REM fail on any error
@echo off
setlocal EnableDelayedExpansion
set "error="

REM make sure the containers that are in the compose script are stopped
docker-compose down -v || set "error=1"
docker-compose rm -v || set "error=1"

REM Build the top-level project in order to have updated versions of the dependencies in our .jar
REM but skip the tests to save some time. We should be allowed to assume these tests have run before the
REM integration-tests are run.
cd ..
mvn clean install -DskipTests || set "error=1"

docker-compose build || set "error=1"
docker-compose up --force-recreate || set "error=1"

REM cleanup, delete the volume too
docker-compose down -v || set "error=1"

REM exit with error code if any command failed
if defined error exit /b 1