const { Router } = require('express');
const express = require('express');
const mysql= require('mysql');
const db= require('./database');

const adminrouter = express();

adminrouter
.get("/ViewDoctors",(req,res)=>{
    var que = "Select do.DocID,do.name,do.age,do.phone,do.email_address,d.dname,do.DID  from hospital.doctors do,hospital.departments d where do.DID = d.DID";
    db.query(que,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
.get("/ViewPatients",(req,res)=>{
    var que = "Select * from hospital.patient";
    db.query(que,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
.post("/createAdmin",async (req,res)=>{
    const length= 'Select * from hospital.admin';
    const sqlInsert = "INSERT INTO hospital.admin VALUES (?,?,?,?,?,?,?,?,?)";
    var adminID;
    await db.query(length,(err,result)=>{
        if(err) throw err; 
      console.log(result.length);
      adminID="A"+(result.length+1);
      var insert_query = mysql.format(sqlInsert,[adminID,req.body.name,req.body.age,req.body.city,req.body.phone,req.body.email_address,req.body.SEX,req.body.ADDRESS,req.body.PASSWORD]);
     db.query(insert_query,(err,result)=>{
      if(err) throw err;
      
      console.log('Successfully inserted');
    });
    });
})
.post("/login",(req,res)=>{
    const ID = req.body.ID
    const password = req.body.password
    const lo= 'Select * from hospital.admin where Adminid = ? AND password = ? ';
    var login_query= mysql.format(lo,[ID,password]);
    db.query(login_query,(err,result)=>{
        if(err)
        {
            res.send({err: err});
        }
        if(result.length>0)
        {
            console.log('WELCOME BACK ',result[0].name);
            res.send(result);
        }
        else{
            console.log('Incorrect ID or Password');
            console.log(ID);
             res.send({message: "wrong username/password combination"});   
        }
    });

})
.get("/ViewDept",(req,res)=>{
    var disp="Select * from hospital.departments";
    db.query(disp,(err,result)=>{
        if(err) throw err;
     res.send(result);
     console.log("Results sent");
    })
})
.post("/createDoctor",async (req,res)=>{
    const length= 'Select * from hospital.doctors';
    const sqlInsert = "INSERT INTO hospital.doctors VALUES (?,?,?,?,?,?,?,?,?,?)";
    var DocID;
    await db.query(length,(err,result)=>{
        if(err) throw err; 
     
      DocID="D"+(result.length+1);
      var insert_query = mysql.format(sqlInsert,[DocID,req.body.name,req.body.age,req.body.city,req.body.phone,req.body.email,req.body.sex,req.body.address,req.body.password,req.body.DID]);
     db.query(insert_query,(err,result)=>{
      if(err) throw err;
      
      console.log('Successfully inserted');
    });
    });
     
})
.delete("/DeleteDoctor/:id",(req,res)=>{
    const id = req.params.id
    var query="Delete from hospital.doctors where DocID=?";
    var delete_q=mysql.format(query,[id]);
    db.query(delete_q,(err,result)=>{
        if(err) throw err;
     if(result)
     {
    console.log("Deleted");
     }
    })
})
.delete("/DeletePatient/:id",(req,res)=>{
    const id = req.params.id
    var query="Delete from hospital.patient where PID=?";
    var delete_q=mysql.format(query,[id]);
    db.query(delete_q,(err,result)=>{
        if(err) throw err;
     if(result)
     {
    console.log("Deleted");
     }
    })
})

module.exports=adminrouter;

































