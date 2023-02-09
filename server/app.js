const express = require('express');
const mysql= require('mysql');
const db= require('./database');
const app=express();
const cors = require("cors");
const adminrouter = require('./adminroutes');
const patientrouter= require('./patientroutes');
const doctorrouter= require('./doctorroutes');
app.use(express.json());
app.use(cors());
app.use("/Admin",adminrouter);
app.use("/Patients",patientrouter);
app.use("/Doctor",doctorrouter);


module.exports=app;