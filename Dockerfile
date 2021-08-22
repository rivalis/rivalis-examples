FROM node:14.17.5-alpine

WORKDIR /service
COPY . .

CMD [ "node", "dist" ]