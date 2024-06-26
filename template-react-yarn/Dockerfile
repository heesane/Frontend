FROM node:21-alpine

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn" , "dev" ]