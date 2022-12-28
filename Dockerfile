#####################################
# BUILD FRONT-END
#####################################
FROM node:16.17-alpine as frontend

WORKDIR /client

# Install dependencies
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm i

# Build the react app
COPY client ./
CMD ["npm", "run", "build"]


#####################################
# BUILD BACKEND
#####################################
FROM node:16.17-alpine as backend

WORKDIR /app

RUN npm install --global nodemon

# Install app dependencies
COPY server/package.json ./
COPY server/package-lock.json ./
RUN npm install

# Add source
COPY ./server/src/ ./src
CMD ["npm", "run", "start"]
