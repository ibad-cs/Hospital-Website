import React from 'react';
import NavBar from "../components/landingPage/Navbar";
import Footer from "../components/landingPage/Footer";
import Login from "../components/landingPage/Login"
export default function LandingPage(props) {
  return (
    <div className='h-screen max-h-min flex flex-col'>
            <NavBar></NavBar>
            <Login></Login>
            <br />
           <Footer />
    </div>
  )
}
