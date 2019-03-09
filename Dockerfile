FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
EXPOSE 9003
COPY . .
CMD [ "npm", "run", "prod" ]