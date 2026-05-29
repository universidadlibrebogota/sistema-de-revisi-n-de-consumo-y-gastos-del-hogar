# =========================
# ETAPA 1: BUILD
# =========================
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copiar TODO el proyecto
COPY . .

# Entrar al backend correcto
WORKDIR /app/backend/sistema-gastos

# Compilar
RUN mvn clean package -DskipTests

# =========================
# ETAPA 2: RUN
# =========================
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copiar el JAR generado
COPY --from=build /app/backend/sistema-gastos/target/*.jar /app/app.jar

# Puerto dinámico Render
ENV PORT=10000

EXPOSE 10000

ENTRYPOINT ["java","-jar","/app/app.jar"]