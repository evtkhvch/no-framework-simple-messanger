FROM node:12.18.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./server/server.js" ]
