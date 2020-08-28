FROM node:alpine as rankup-app-build
WORKDIR /client
COPY package.json yarn.lock ./
RUN yarn
COPY ./public ./public
COPY ./src ./src
ENV REACT_APP_GATEWAY_URL=<backend-app-service-ip>:<port>
RUN yarn build
FROM nginx:latest
LABEL maintainer=amr-hussien
COPY - from=rankup-app-build /client/build/ /usr/share/nginx/html
EXPOSE 80