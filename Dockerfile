FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm i --silent
COPY . ./
EXPOSE ${PORT}
CMD npm run dev
