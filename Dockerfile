#####################################
# BUILD FRONT-END
#####################################
FROM node:16.17-alpine as frontend

WORKDIR /client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

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

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

RUN npm install --global nodemon

# Add source
COPY ./server ./
RUN npm install
CMD ["npm", "run", "start"]
