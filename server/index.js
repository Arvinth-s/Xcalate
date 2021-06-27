const express = require("express");
const app = express();
const mysql = require("mysql");
let date = new Date();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "xcalate"
});


app.get("/addSubscriber", (req, res)=>{
    let date = new Date();
    const sqlInsert='insert into subscribers (address, expiry) values ("arvinth", ?)'
    db.query(sqlInsert, date, function(err, results){
        if(err)console.log('err:', err);
        console.log("results: ", results);
    });
    res.send('inserted');
})

app.get("/output",(req,res) => {
    const sqlInsert = "";
    db.query('select * from subscribers', function(err, results){
        console.log(results);
    });
    res.send("Hello-World");
});

app.listen(3001,() => {
    console.log("running on port 3001");
});