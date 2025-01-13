const {Client}=require('pg')
const express=require('express')
const cors = require('cors');
const app=express()
app.use(express.json())
app.use(cors())

const con=new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password: "password",
    database: "employee"

})

con.connect().then(()=> console.log("connected"))

app.post('/createEmployee',(req,res)=> {

 const {name,empid,department}=req.body

 const insert_query='INSERT INTO employee (name,empid,department) VALUES ($1,$2,$3)'

 con.query(insert_query,[name,empid,department],(err,result)=>{
    if(err){
        res.send(err)
    }else{
        console.log(result);
        res.json({result});
    }
 })

})

app.get('/getEmployees',(req,res)=>{
    const getEmployee="Select * from employee"
    con.query(getEmployee,(err,result)=>{
        if(err){
            res.send(err)
        }else{
            console.log(result);
            res.send(result.rows)
        }
    })
})

app.get('/getEmployees/:id',(req,res)=>{
    const id=req.params.id
    const getEmployeeById="Select * from employee where id=$1"
    con.query(getEmployeeById,[id],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            console.log(result);
            res.send(result.rows)
        }
    })
})

app.put('/updateEmployee/:id',(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;
    const empid=req.body.empid;
    const department=req.body.department;

    const update_query="update employee set name=$1,empid=$2,department=$3 where id=$4";
    con.query(update_query,[name,empid,department,id],(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.json({result});
        }
    })
})

app.delete('/deleteEmployee/:id',(req,res)=>{
    const id=req.params.id
    const delQuery="delete from employee where id=$1"
    con.query(delQuery,[id],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.json({id});
        }
    })

})

app.listen(3000,()=>{
    console.log("Server Running")
})