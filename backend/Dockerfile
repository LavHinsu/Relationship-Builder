FROM node:latest
RUN mkdir -p /usr/src/backendapp
WORKDIR /usr/src/backendapp

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000
CMD [ "npm", "start" ]