FROM node:18-slim

# Create app directory
WORKDIR /frontend

# Install app dependencies
COPY package.json ./

COPY . .

RUN npm install

ENV NODE_ENV=development

CMD [ "npm", "start" ]