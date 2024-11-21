FROM node:21-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .

FROM node:21-alpine AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
CMD [ "node", "app.js" ]
