# Use the official Node.js image as the base image
FROM node:21-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install MySQL client and server
RUN apk --no-cache add mysql bash

# Install 'wait-for-it' script
RUN wget -O /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Start MySQL server and wait for it to be ready
CMD ["sh", "-c", "mysqld_safe --user=mysql & /usr/local/bin/wait-for-it.sh mysql-db:3306 -- npm run start-app"]