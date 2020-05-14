module.exports = {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.NODE_ENV === 'test' ?  process.env.MYSQL_TEST_DB : process.env.MYSQL_DB
};
