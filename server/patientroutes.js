const { Router } = require('express');
const express = require('express');
const mysql= require('mysql');
const db= require('./database');
var ID;
const patientrouter = express();
function ViewFutureAppt()
{
    return new Promise((resolve,reject)=>{
    var disp="select * from hospital.appointments where appointments.Date> curdate() and PID= ?";
    var insert_q=mysql.format(disp,[ID]);
    db.query(insert_q,(err,result)=>{
        
        if(err)
        reject(err);

    resolve(result);
   })
   

    });
}
patientrouter
// .post("/Signup",async (req,res)=>{
//     const length= 'Select * from hospital.patient';
//     const sqlInsert = "INSERT INTO hospital.patient VALUES (?,?,?,?,?,?,?,?,?)";
//     var PID;
//     await db.query(length,(err,result)=>{
//         if(err) throw err; 
//       PID="P"+(result.length+1);
//       ID=PID;
//       var insert_query = mysql.format(sqlInsert,[PID,req.body.name,req.body.age,req.body.city,req.body.phone,req.body.email,req.body.sex,req.body.address,req.body.password]);
//      db.query(insert_query,(err,result)=>{
//       if(err) throw err;
//       else{
//         res.send(PID);
//       }
//       console.log('Successfully inserted');
//     });
//     });

    

// })
.post("/Login",(req,res)=>{
     ID = req.body.ID
     console.log(ID);
    const password = req.body.password
    const lo= 'Select name from hospital.patient where PID = ? AND PASSWORD = ? ';
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
.post("/BookAppointments", async (req,res)=>{
    // var DeptId;
    // var  que="Select DID from hospital.doctors where DocID = ?";
    // var deptid_query=mysql.format(que,[req.body.DID]);
    // db.query(deptid_query,(err,result)=>{
    // if(err) throw err;
    // DeptId = result[0].DID;
    // console.log(DeptId);
    // }
    // )
    var length="Select * from hospital.appointments";
    const sqlInsert = "INSERT INTO hospital.appointments VALUES (?,?,?,?,?,?)";
    await db.query(length,(err,result)=>{
        if(err) throw err; 
      APID="AP"+(result.length+1);
      var insert_query = mysql.format(sqlInsert,[APID,req.body.Date,req.body.Comments,req.body.DID,req.body.ID,req.body.DeptId]);
     db.query(insert_query,(err,result)=>{
      if(err) throw err;
      
      console.log('Successfully inserted');
    });
    });
    
})
.get("/ViewDeptwiseDoctors",(req,res)=>{
    var q ="Select * from hospital.doctors where DID in (select DID from Hospital.departments where DID = ?) ";
    var insert_q=mysql.format(q,[req.body.id]);
    db.query(insert_q,(err,result)=>{
        if(err) throw err;
        if(result.length==0)
        {
        res.send("No doctors currently available in this department");
        }
        else
        {
        res.send(result);
        }
    })
    })
.get("/ViewDept",(req,res)=>{
    var disp="Select * from hospital.departments";
    db.query(disp,(err,result)=>{
        if(err) throw err;
     res.send(result);
     console.log("Results sent");
    })

})
.get("/ViewAppointments/:id",(req,res)=>{
    const ID = req.params.id
    var disp="select app.ApID,d.name as docname,app.Date,de.dname from hospital.appointments app,hospital.doctors d,hospital.departments de where  app.DID=d.DocID and app.DeptID=de.DID and app.PID= ?";
    var insert_q=mysql.format(disp,[ID]);
    db.query(insert_q,(err,result)=>{
        if(err) throw err;
     res.send(result);
     console.log("Results sent");
    })
})

.get("/ViewPAppointments/:id",(req,res)=>{
    const ID = req.params.id
    var disp="select app.DeptID,app.ApID,app.PID as patID,p.name as patname,date_format(app.Date, '%Y-%m-%d' ) as Date from hospital.appointments app,hospital.patient p where app.PID = p.PID and app.PID = ? and app.Date < curDate() ";
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
   const ApID = req.params.id

   var disp="Delete from hospital.appointments where appointments.ApID=?";
   var insert_q=mysql.format(disp,[ApID]);
   db.query(insert_q,(err,result)=>{
    if(err) throw err;
   console.log("deleted");
  });

})
.get("/ViewPrescription",(req,res)=>{
   var viewpre= 'select Medname,Dosage from hospital.prescription where PID= ?';
   var viewpre_q= mysql.format(viewpre,[ID]);
   db.query(viewpre_q,(err,result)=>{
    if(err) throw err;
    res.send(result);
    console.log("Results sent");
});

})

.post("/Signup",async (req,res)=>{
    const length= 'Select * from hospital.patient';
    const sqlInsert = "INSERT INTO hospital.patient VALUES (?,?,?,?,?,?,?,?,?)";
    var PID;
    await db.query(length,(err,result)=>{
        if(err) throw err; 
      PID="P"+(result.length+1);
      ID=PID;
      var insert_query = mysql.format(sqlInsert,[PID,req.body.name,req.body.age,req.body.city,req.body.phone,req.body.email,req.body.sex,req.body.address,req.body.password]);
     db.query(insert_query,(err,result)=>{
      if(err) throw err;
      else{
        res.send(PID);
      }
      console.log('Successfully inserted');
    });
    });

    var MEDID;
    
    var qu='select * from hospital.medhistory';
    var his=" ";
    var  que="insert into hospital.medhistory values (?,?,?)";

    db.query(qu,(err,result)=>{
        if(err) throw err;
        MEDID= "M"+(result.length+1);
        var ins_q= mysql.format(que,[MEDID,req.body.history,PID]);
        db.query(ins_q,(err,result)=>{
            if(err) throw err;
         console.log('inserted');
        
    
          
        
    })

})
})




.post("/AddHistory",(req,res)=>{
    var MEDID;
    var q="select medhistory.record from hospital.medhistory where PID = ?";
    var ins_qw=mysql.format(q,[ID]);
    var qu='select * from hospital.medhistory';
    var his=" ";
    var  que="insert into hospital.medhistory values (?,?,?)";
    var query="Update hospital.medhistory set record=? where PID=?";
    db.query(qu,(err,result)=>{
        if(err) throw err;
        MEDID= "M"+(result.length)+1;
        db.query(ins_qw,(err,result)=>{
            if(err) throw err;
          if(result.length)
          {
          his=result[0].record;
          var insert_query=mysql.format(query,[his+req.body.history,ID]);
          db.query(insert_query,(err,result)=>{
            if(err) throw err;
            console.log("Inserted");
        })
          }
          else{
        var ins_q= mysql.format(que,[MEDID,his+req.body.history,ID]);
        db.query(ins_q,(err,result)=>{
            if(err)
            throw err;
         console.log("Inserted");
        })
    }
          
        });
    })
    
})


module.exports= patientrouter;
