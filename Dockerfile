FROM node:12-alpine

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

ENV NODE_ENV production

CMD [ "yarn", "start" ]
