FROM node:latest
RUN mkdir -p /usr/src/backendapp
WORKDIR /usr/src/backendapp

RUN npm install

EXPOSE 8000
CMD [ "npm", "start" ]