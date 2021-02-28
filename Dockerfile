FROM node:12.18.3-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "server.js"]
