FROM node:latest
RUN mkdir -p /usr/src/frontendapp
WORKDIR /usr/src/frontendapp

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]