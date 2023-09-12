#####################################
# BUILD FRONT-END
#####################################
FROM node:18-alpine as frontend


WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY ./package.json ./
RUN npm i

# Build the react app
COPY src ./
CMD ["npm", "run", "build"]
