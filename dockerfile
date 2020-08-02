FROM node:erbium

WORKDIR /usr/src/pubg-nepal

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","index.js"]