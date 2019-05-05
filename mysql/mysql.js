const mysql = require("mysql")
const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "koa_demo"
});

pool.getConnection(function (err, connection) {

     connection.query('SELECT * FROM my_table', (error, results, fields) => {

         // 结束会话
         connection.release();

         // 如果有错误就抛出
         if (error) throw error;
     })

});