FROM node:latest

ENV LANG C.UTF-8

COPY . .
RUN npm install
RUN npm install typescript -g
RUN npm run build

WORKDIR build

CMD [ "node", "index.js" ]
