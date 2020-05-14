FROM node:12
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 8081
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.2/wait /wait
RUN chmod +x /wait
