import styled from "styled-components";
import Axios from "axios";
import Button from "../Button";
import Icon from "../Icon";
import Input from "../Input";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import PRegisterModal from "./registerpatient";

import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [Toggle, setToggle] = useState("Patient");

  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
 const [Show,setShow] = useState(false);
  // const displayFields = () => {
  //       console.log(ID + ' ' + password);
  // };
const handleAdminLogin = () => {
   Axios.post("http://localhost:3001/Admin/login", {
    ID: ID,
    password: password,
   }).then((response) => {
    if(response.data.message)
    {
      setError(true);
      alert("Invalid Credentials");
    }
    else
    {
     
      localStorage.setItem("ID",ID);
      localStorage.setItem("password",password);
      navigate("/admin/dashboard");

    }
   });
};

const handlePatientLogin = () => {
  Axios.post("http://localhost:3001/Patients/login", {
   ID: ID,
   password: password,
  }).then((response) => {
    if(response.data.message)
    {
      setError(true);
      alert("Invalid Credentials");
    }
    else
    {
     
      localStorage.setItem("ID",ID);
      localStorage.setItem("password",password);
      navigate("/patient/dashboard");
    }
  });
};

const handleDoctorLogin = () => {
  Axios.post("http://localhost:3001/Doctor/login", {
   ID: ID,
   password: password,
  }).then((response) => {
    if(response.data.message)
    {
      setError(true);
      alert("Invalid Credentials");
    }
    else
    {
     
      localStorage.setItem("ID",ID);
      localStorage.setItem("password",password);
      navigate("/doctor/dashboard");
    }
  });

};


  const handleLogin = async (e) => {
    e.preventDefault();
    switch (Toggle) {
      case "Patient":
      handlePatientLogin(ID,password);
        break;
      case "Doctor":
           handleDoctorLogin(ID,password);
        break;
      case "Admin":
            // displayFields();       
            handleAdminLogin(ID,password);

        break;
      default:
        break;
    }
  };


  return (
    <MainContainer>
      <WelcomeText>Welcome</WelcomeText>
      <InputContainer>
        
          
              <label           
                className="font-poppins pt-2 pb-1 text-lg font-bold  text-indigo-900"
              >
                {Toggle === "Patient" ? "Patient ID" : Toggle === "Doctor" ? "Doctor ID" : "Admin ID"}
              </label>
              <input type="text"
             placeholder="User ID..."
              onChange={(e) => {setID(e.target.value);}}
              
              />
              <label
                
                className="font-poppins pt-6 pb-1 text-lg font-bold text-indigo-900"
              >Password</label>
              <input type="password"  
              placeholder="password.."
              onChange={(e) => {setPassword(e.target.value);}}
              
               />
                
                <button
                onClick={handleLogin} 
            className="text-lg mt-10 bg-indigo-900 py-2 px-16 rounded font-semibold font-poppins shadow-sm hover:bg-transparent hover:text-indigo-900"
          >
            Login
          </button>  
          {Toggle === "Patient" ? 
          <button
          onClick={() => {setShow(true)}} 
      className="text-lg mt-10 bg-indigo-900 py-2 px-16 rounded font-semibold font-poppins shadow-sm hover:bg-transparent hover:text-indigo-900"
    >
      Register
    </button> 
    : ""
        }
    {Show && <PRegisterModal setShow={setShow} />}


<br />

      </InputContainer>
      <br/ >
      {/* <LoginWith>OR LOGIN WITH</LoginWith> */}
      <HorizontalRule />
      <div className="flex bg-transparent pt-8 w-fit justify-between rounded">
      
        <button
          className={
            Toggle === "Patient"
              ? "py-2 px-8 text-lg font-poppins font-bold cursor-pointer rounded bg-gradient-to-r from-purple-900 to-blue-700"
              : "py-2 px-8 text-lg font-poppins font-semibold text-indigo-900 cursor-pointer rounded"
              
          }
          onClick={() => {
            setToggle("Patient");
            setID("");
            setPassword("");
            setError("");
                      }}
        >
          Patient
        </button>
        <button
          onClick={() => {
            setToggle("Doctor");
            setID("");
            setPassword("");
            setError("");
          }}
          className={
            Toggle === "Doctor"
              ? "py-2 px-8 text-lg font-poppins font-bold cursor-pointer rounded bg-gradient-to-r from-purple-900 via-blue-700 to-purple-900"
              : "py-2 px-8 text-lg font-poppins font-semibold text-indigo-900 cursor-pointer rounded"
          }
        >
          Doctor
        </button>
        <button
          onClick={() => {
            setToggle("Admin");
            setID("");
            setPassword("");
            setError("");
          }}
          className={
            Toggle === "Admin"
              ? "py-2 px-8 text-lg font-poppins font-bold cursor-pointer rounded bg-gradient-to-l from-purple-900 to-blue-700"
              : "py-2 px-8 text-lg font-poppins font-semibold text-indigo-900 cursor-pointer rounded"
          }
        >
          Admin
        </button>
        </div>
        
      {/* <CreateAccount>Create new account</CreateAccount> */}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  width: 30vw;
  margin-top: 40px;
  margin-left: 35%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color:black;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: black;
  height: 20%;
  width: 100%;
  margin-top: 110px;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;



const CreateAccount= styled.h4`
  cursor: pointer;
`;

