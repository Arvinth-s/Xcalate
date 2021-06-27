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
    const sql='insert into subscribers (address, expiry) values ("arvinth", ?)'
    db.query(sql, date, function(err, results){
        if(err)console.log('err:', err);
        console.log("results: ", results);
    });
    res.send('inserted');
});

app.get("/subscribers",(req,res) => {
    const sql = "select * from subscribers";
    var data = {
      Data: "",
    };
    db.query(sql, function (err, rows, fields) {
      if (rows.length != 0) {
        data["Data"] = rows;
        res.json(data);
      } else {
        data["Data"] = "No data Found..";
        res.json(data);
      }
    });
});

app.get("/expiry", (req, res) => {

  const sql = "select * from subscribers where address = ?";
  var data = {
    Data: "",
  };
  db.query(sql, [req.query.address],function (err, rows, fields) {
    if (rows.length != 0) {
      data["Data"] = rows;
      res.json(data);
    } else {
      data["Data"] = "No data Found..";
      res.json(data);
    }
  });
});


app.get("/matchOrder", (req, res) => {
     console.log('req: ', req.query);
    var order=req.query;
  const sql = "select * from orders where purchase = ? and price >= ?";
  var data = {
    Data: "",
  };
  db.query(sql, [order.purchase, order.price], function (err, rows, fields) {
    if (rows.length != 0) {
      data["Data"] = rows;
      res.json(data);
    } else {
      data["Data"] = "No data Found..";
      res.json(data);
    }
  });
});



app.listen(3001,() => {
    console.log("running on port 3001");
});