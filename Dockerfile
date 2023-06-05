FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

EXPOSE 8110

CMD ["node", "-r", "dotenv/config", "index.js"]