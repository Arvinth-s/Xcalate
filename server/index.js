const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Xcalate"
});

app.get("/",(req,res) => {

    const sqlInsert = "INSERT INTO auth_data {user_id,pass}";
    db.query();
    res.send("Hello World");
});

app.listen(3001,() => {
    console.log("running on port 3001");
});