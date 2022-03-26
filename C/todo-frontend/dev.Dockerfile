FROM node:16 

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "npm", "run","start" ]

ENV REACT_APP_BACKEND_URL = 'http://localhost:8080/api'



