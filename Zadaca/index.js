const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Grad"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL database!");

    app.get('/dodaj_grad/:naziv/:drzava/:posta', (req, res) => {
        let naziv = req.params.naziv;
        let drzava = req.params.drzava;
        let posta = req.params.posta;

        var sql = "INSERT INTO gradovi (naziv, drzava, posta) VALUES (?, ?, ?)";
        con.query(sql, [naziv, drzava, posta], function (err, result) {
            if (err) {
                console.error('Greška!' + err);
                res.status(500).send('Greška prilikom dodavanja!');
                return;
            }
            console.log("1 record inserted");
            res.send('Dodano!');
        });
    });

    app.listen(port, (err) => {
        if (err) {
            console.error('Greška prilikom pokretanja servera:' + err);
            return;
        }
        console.log(`Web aplikacija pokrenuta na portu ${port}`);
    });
});
