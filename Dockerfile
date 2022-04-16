FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g nodemon
RUN npm install

COPY . ./

EXPOSE 3002

CMD ["npm", "start"]
