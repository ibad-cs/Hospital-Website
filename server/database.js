var mysql = require('mysql');  
const { createConnection } = require('net');
var con = mysql.createConnection({  
host: "localhost",  
user: "root",  
password: "abc123",
database:"hospital_admin"
});
con.connect(function(err){
    if(err) throw err;
    console.log('connected');
});

module.exports = con;