import React from 'react';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
export default function Navbar() {
  return (
    <MainContainer>
    <nav className=" lg:w-screen lg:h-14 shadow-sm lg:px-16 lg:py-3 flex justify-items-center items-center  w-full ">
    <img
      src={logo}
      alt="logo"
      className="lg:h-10 lg:pr-3 h-10 pr-4 pl-2 mt-2"
    />
    <h1 className="font-poppins font-bold text-sm text-indigo-900 lg:text-xl mt-2 mb-2">
      <Link to="/">Haspataal Management System</Link>
    </h1>
    <ul className="flex ml-auto lg:w-60 justify-evenly  font-lato font-semibold text-indigo-900 w-64 ">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">About us</Link>
      </li>
      <li>
        <Link to="/">Contact us</Link>
      </li>
    </ul>

   
  </nav>
  </MainContainer>
  );
}

const MainContainer=styled.div`
 background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
`;