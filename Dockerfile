FROM node:latest

ENV LANG C.UTF-8

COPY . .
RUN npm install
RUN tsc

WORKDIR build

CMD [ "node", "index.js" ]
