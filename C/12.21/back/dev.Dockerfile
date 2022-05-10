FROM node:14

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

USER node

CMD npm run start