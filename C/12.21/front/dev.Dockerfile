FROM node:16 

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "npm", "run","start" ]

# ENV REACT_APPEND_URL = 'http://localhost:8080/api'



