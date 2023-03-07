FROM node:16.13-alpine
WORKDIR ./
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD ["npm","start"]