const { Router, json } = require('express');
const express = require('express');
const mysql= require('mysql');
const db= require('./database');
var ID;
const doctorrouter = express();
function ViewFutureAppt()
{
    return new Promise((resolve,reject)=>{
    var disp="select * from hospital.appointments where appointments.Date> curdate() and DID= ?";
    var insert_q=mysql.format(disp,[ID]);
    db.query(insert_q,(err,result)=>{
        
        if(err)
        reject(err);

    resolve(result);
   })
   

    });
}
function ViewPastAppt()
{  return new Promise((resolve,reject)=>{
    var disp="select * from hospital.appointments where appointments.Date<curdate() and DID= ?";
    var insert_q=mysql.format(disp,[ID]);
    db.query(insert_q,(err,result)=>{
        
        if(err)
        reject(err);

    resolve(result);
   })
   

    });
}
doctorrouter
.get("/ViewPatients",(req,res)=>{
    var qy = "Select patient.PID,patient.Name,patient.age,patient.sex from hospital.patient where PID=?";
   var data=[];
    var qy_q= mysql.format(qy,[req.body.PID]);
    db.query(qy_q,(err,result)=>{
       if(err) throw err;
       data.push({"PID":result[0].PID,
                   "Name":result[0].name,
                   "AGE":result[0].age,
                   "Sex":result[0].sex});
                 
    })
 
    var qued="Select medrecord from hospital.medhistory where PID =?";
    var que_q=mysql.format(qued,[req.body.PID]);
   
    db.query(que_q,(err,result)=>{
         data.push({result})
         res.send(data);
    });
   })
.post("/login",(req,res)=>{
     ID = req.body.ID
    const password = req.body.password
    const lo= 'Select * from hospital.doctors where DocID = ? AND PASSWORD = ? ';
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
.get("/ViewAppointments/:id",(req,res)=>{
    const ID = req.params.id
    var disp="select app.ApID,app.PID as patID,p.name as patname,app.Date from hospital.appointments app,hospital.patient p where app.PID = p.PID and app.DID = ? ";
    var insert_q=mysql.format(disp,[ID]);
    db.query(insert_q,(err,result)=>{
        if(err) throw err;
     res.send(result);
     console.log("Results sent");
    })
})

.get("/ViewHistory/:id",(req,res)=>{
    const ID = req.params.id
    var disp="select MID,record from hospital.medhistory where PID = ? ";
    var insert_q=mysql.format(disp,[ID]);
    db.query(insert_q,(err,result)=>{
        if(err) throw err;
     res.send(result);
     console.log("History sent");
    })
})


.get("/ViewPAppointments/:id",(req,res)=>{
    const ID = req.params.id
    var disp="select app.ApID,app.PID as patID,p.name as patname,app.Date from hospital.appointments app,hospital.patient p where app.PID = p.PID and app.DID = ? and app.Date < curDate() ";
    var insert_q=mysql.format(disp,[ID]);
    db.query(insert_q,(err,result)=>{
        if(err) throw err;
     res.send(result);
     console.log("Results sent");
    })
})



.get("/ViewFutureAppt",async (req,res)=>{
    var array;
    array= await ViewFutureAppt();
    res.send(array);
    
    })
.delete("/DeleteAppt/:id",async (req,res)=>{
        const id = req.params.id;
       var disp="Delete from hospital.appointments where appointments.ApID=? ";
       var insert_q=mysql.format(disp,[id]);
       db.query(insert_q,(err,result)=>{
        if(err) throw err;
       else{
        console.log("deleted");
       }
      });
    
    })
.get("/ViewPastAppt",async (req,res)=>{
    var array;
    array= await ViewPastAppt();
    res.send(array);
    })
.post("/AddPrescription",(req,res)=>{
    const length= 'Select * from hospital.prescription';
    const sqlInsert = "INSERT INTO hospital.prescription VALUES (?,?,?,?,?,?,?)";
    const verify = 'Select * from hospital.appointments where ApID=? and curdate()>appointments.date and DID=? and PID=?';
    const verify_q= mysql.format(verify,[req.body.ApID,ID,req.body.PID]);
    var PrID;
    var date;
   db.query(verify_q,(err,result)=>{
     if(err)
     throw err;

    date=result[0].Date;
     
    db.query(length,(err,result)=>{
        if(err) throw err; 
      PrID="Pr"+(result.length+1);

      var insert_query = mysql.format(sqlInsert,[PrID,ID,req.body.PID,req.body.ApID,date,req.body.MedName,req.body.Dosage]);
     db.query(insert_query,(err,result)=>{
      if(err) throw err;
      if(result.length)
      {
      console.log('Successfully inserted');
      }
    });
    });
});

})
.patch("/AddComment",(req,res)=>{
    const verify = 'Update hospital.appointments set Comments = ? where ApID=? and curdate()>appointments.date and DID=? and PID=? and date=?';
    const verify_q= mysql.format(verify,[req.body.Comments,req.body.ApID,ID,req.body.PID,req.body.Date]);
    db.query(verify_q,(err,result)=>{
        if(err)
        {
        throw(err);
        }
      if(!result.length)
      {
     console.log("Not found");
      }
      if(result.length)
      {
      console.log("Inserted");
      }
        
    })
})




module.exports = doctorrouter;
