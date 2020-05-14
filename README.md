# Product Management System (PMS) Demo

## Overview

Pull the project source to local machine from github:
```
git clone git@github.com:shane2008/pms.git
cd pms
```
Frontend `pms-frontend` is a Vue.js app for the web UI. Backend `pms-frontend` is a Node Express app providing API end points for the frontend app and fetch data from MySQL database.


## Run project using docker-compose (Recommended)

#### Tested with docker-compose version 1.25.5 and Docker version 19.03.8 ####


Ensure docker-compose and Docker engine are installed, run:

```
docker-compose up
```
This should bring up `mysql-container`, `pms-frontend-container` and `pms-backend-container`. Application should be ready at `http://localhost:8080`

#### To connect to mysql in docker container from host, with mysql client installed, run: ####
```
docker exec -it mysql-container mysql -upms_user -p
```
Use password `pms_password` when prompted.

Once connected, type `use pms_db;` to switch to project's database.

#### Run tests in backend container ####
```
docker exec -it pms-backend-container npm test
```

## Alternatively you can run the project by manually preparing and starting MySQL, backend and frontend.

#### Tested with MySQL 5.7 and Node 12

### MySQL

Ensure MySQL server is running, create database `pms_db`, accessible by user `pms_user` with password `pms_password`. Import database schema and data from `pms_schema_data.sql` file from project's root to `pms_db`.

Create database `pms_db` and `pms_test_db`, user `pms_user` and populate data: (root user password is `root` when prompted)
```
mysql -uroot -p < pms_schema_data.sql
mysql -uroot -p < pms_test_schema_data.sql
mysql -uroot -p
```
After connected to mysql, run:
```
CREATE USER 'pms_user'@'localhost' IDENTIFIED BY 'pms_password';
GRANT ALL PRIVILEGES ON pms_db.* TO 'pms_user' identified by 'pms_password';
GRANT ALL PRIVILEGES ON pms_test_db.* TO 'pms_user' identified by 'pms_password';
```
### Backend
Set environment variables on the host machine: (This can be achieved in a better way using npm package such as `dotenv`)
```
export MYSQL_HOST=localhost
export MYSQL_USER=pms_user
export MYSQL_PASSWORD=pms_password
export MYSQL_DB=pms_db
export MYSQL_TEST_DB=pms_test_db
```
From project root, run:
```
cd pms-backend
npm install
npm start
```
Backend should be ready at `http://localhost:8081`

Using a tool such as Postman, you can verify the backend is ready by querying `http://localhost:8081/products` or `http://localhost:8081/departments` using `GET`.

Run tests using:
```
npm test
```

### Frontend
From project root, run:
```
cd pms-frontend
npm install
npm run serve
```
Frontend should be ready at `http://localhost:8080`
