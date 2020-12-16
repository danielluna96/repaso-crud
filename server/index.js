const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    user: 'admindanielluna',
    host: 'repasocrud.c2xtnseqmrkx.us-east-2.rds.amazonaws.com',
    password: 'univalle.edu.co',
    database: 'repasocruddb',
})

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)', [name, age, country, position, wage], (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    })

});

app.get('/employees', (req, res) => {
    db.query("Select * from employees", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query("UPDATE employees SET wage = ? WHERE id = ?", [wage, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

app.listen(3001, ()=>{
    console.log("Server running");
})