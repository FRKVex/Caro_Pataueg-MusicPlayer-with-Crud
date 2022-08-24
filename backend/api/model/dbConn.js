const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    database : "app_db"
});

db.connect((err) => {
    if(err){
        console.log("Error connecting to database");
        throw err;
    }
    else{
        console.log('MySql Connected');
    }
    
});

module.exports = db;