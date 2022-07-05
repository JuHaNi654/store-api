FROM node:16-alpine

RUN apk update \ 
    && apk upgrade --available \
    && apk add --no-cache --upgrade bash

WORKDIR /usr/src/app

COPY package*.json ./
COPY nodemon.json ./
COPY tsconfig.json ./


RUN npm install

COPY ./src ./src
COPY ./mock ./mock
COPY ./prisma ./prisma

COPY ./bin/dev.sh /usr/src/app/bin/dev.sh
RUN chmod +x /usr/src/app/bin/dev.sh