# =========================
# BUILD
# =========================
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY . .

# ✅ AQUÍ ESTÁ EL FIX REAL
WORKDIR /app

RUN mvn clean package -DskipTests

# =========================
# RUN
# =========================
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

ENV PORT=10000

EXPOSE 10000

ENTRYPOINT ["java","-jar","/app/app.jar"]