# Étape 1 : Build de l’app Angular
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 2 : Servir avec Nginx (plus léger et plus pro)
FROM nginx:alpine
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

EXPOSE 80