FROM openjdk:17
EXPOSE 8888
ADD springConfig/target/springConfig-0.0.1-SNAPSHOT.jar springConfig.jar
ENTRYPOINT ["java", "-jar", "springConfig.jar"]