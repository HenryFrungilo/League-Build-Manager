# Stage 1: build the Angular app
FROM node:18.20-alpine AS build

WORKDIR /app
ENV NG_CLI_ANALYTICS=false

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npx ng build --configuration production

# Stage 2: serve the static files with Nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/tft-build-manager /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
