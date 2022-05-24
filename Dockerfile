FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY ./client/package*.json client/
RUN npm run install-client

COPY ./server/package*.json server/
RUN npm run install-server

COPY /client client/
RUN npm run feBuild

COPY /server server/

CMD [ "npm" , "run" , "app"]

EXPOSE 8000
