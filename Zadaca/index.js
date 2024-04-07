const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Grad"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database!");

  app.get('/gradovi', (req, res) => {
    con.query("SELECT * FROM gradovi", function (err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  });

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
