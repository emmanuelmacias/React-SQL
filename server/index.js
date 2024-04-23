const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'turnos'
});


app.post('/create', (req,res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;

    db.query('INSERT INTO users(nombre,apellido,email) VALUES(?,?,?)',[nombre,apellido,email],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
});


app.get('/users', (req,res)=>{
    db.query('SELECT * FROM users',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
});


app.put('/update', (req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;

    db.query('UPDATE users SET nombre=?,apellido=?,email=? WHERE id=?',[nombre,apellido,email,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
});


app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM users WHERE id=?',[id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
});

app.listen(3001,()=>{
    console.log('Server OK Puerto 3001')
})