import mysql from "mysql";

const mydb = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'login-jwt',
});

export default mydb;
