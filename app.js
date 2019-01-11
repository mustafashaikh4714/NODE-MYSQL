const express = require('express');
const mysql = require('mysql')

const app = express();

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '123456',
    database: 'mydb'
})

db.connect((err) => {
    if(err) {
      console.log("Error", err);
    }
    console.log("MySql Connected Successfully!");
})

//CREATE DATABASE
app.get('/createdb', (req, res) => {
    var sql = 'CREATE DATABASE mydb';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created successfully !")
    })
})

// CREATE TABLE
app.get('/createtable', (req, res) => {
    sql = 'create table teacher(id int primary key, name varchar(30), subject varchar(30))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("table created...")
    })
})

//INSERT RECORDS
app.get('/insertData', (req, res) => {
    let data = {id:'1234', name:'anil sir', subject: 'physics'}
    let sql = 'insert into teacher set ?';
    db.query(sql, data, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Inserted...") 
    })
})

//RETRIEVING THE DATA
app.get('/getData', (req, res) => {
   let sql = 'select * from teacher';
   db.query(sql, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send("fetch..")  
   })
})

//RETRIEVING DATA BY ID
app.get('/getData/:id', (req, res) => {
    let sql = `select * from teacher where id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("fetch..")  
    })
 })

 //UPDATE DATA 
app.get('/updateData/:id', (req, res) => {
    let newName = 'dange sir';
    let sql = `update teacher set name = '${newName}' where id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("updated...")  
    })
 })

  //DELETE DATA 
app.get('/deleteData/:id', (req, res) => {

    let sql = `delete from teacher where id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("deleted...")  
    })
 })


app.listen(3000, () => {
    console.log("Listening on port 3000")
})


//RUN -
//mysql -u root -p -h localhost
//123456