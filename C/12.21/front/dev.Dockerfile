FROM node:16 

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APPEND_URL = 'http://localhost:8080/api'

CMD [ "npm","run", "start" ]





