FROM node:latest as builder

WORKDIR /usr/local/app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=builder /usr/local/app/dist/motus /usr/share/nginx/html

EXPOSE 80