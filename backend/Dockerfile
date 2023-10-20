FROM openjdk:17-jdk-slim

ADD target/backend-0.0.1-SNAPSHOT.jar /srv/application/application.jar
ADD docker/config/ /srv/application/config/
WORKDIR "/srv/application/"
ENTRYPOINT ["java", "-jar", "/srv/application/application.jar"]