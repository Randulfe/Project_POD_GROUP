FROM node:v12.16.1

WORKDIR /proyect_podgroup

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
