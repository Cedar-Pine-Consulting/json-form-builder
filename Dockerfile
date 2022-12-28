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
RUN npm run build
# RUN npm run start


#####################################
# BUILD BACKEND
#####################################
FROM node:16.17-alpine as backend

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY . ./


# Copy the client
COPY --from=frontend /client ./client

RUN npm install --global nodemon

# RUN npm run migrate
ENTRYPOINT ./entrypoint.sh
