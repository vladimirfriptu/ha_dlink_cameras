ARG BUILD_FROM
FROM $BUILD_FROM

FROM node:latest

ENV LANG C.UTF-8

COPY . .
RUN npm install

CMD [ "node", "index.js" ]
