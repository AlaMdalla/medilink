FROM openjdk:17
EXPOSE 8085
ADD target/subscription-0.0.1-SNAPSHOT.jar subscription.jar
ENTRYPOINT ["java", "-jar", "subscription.jar"]