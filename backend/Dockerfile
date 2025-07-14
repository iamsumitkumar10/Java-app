FROM maven AS build
WORKDIR /app
COPY . .
RUN mvn package
RUN mv /app/target/*.jar /app/target/App.jar

FROM openjdk:17-jdk-slim
WORKDIR /App
COPY --from=build /app/target/App.jar .
CMD ["java", "-jar", "App.jar"]
EXPOSE 8080
