FROM node:alpine

WORKDIR /server

COPY package*.json ./

RUN yarn

RUN npm ci --only=production

COPY src ./src
COPY config ./config

EXPOSE 3001

CMD [ "npm", "start" ]
