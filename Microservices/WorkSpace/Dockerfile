FROM node:alpine
WORKDIR /server/workspace
COPY package*.json ./
COPY build ./build
COPY config ./config
RUN npm ci --only=production
ENTRYPOINT ["npm","run","prod"]