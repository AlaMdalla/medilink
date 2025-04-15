FROM openjdk:17
EXPOSE 8081
ADD target/keycloak-0.0.1-SNAPSHOT.jar keycloak.jar
ENTRYPOINT ["java", "-jar", "keycloak.jar"]