import React from 'react'
import styled from 'styled-components';
export default function Footer() {
  return (
    <MainContainer>
    <div className=" mt-auto py-4 w-screen flex justify-center items-center  shadow-inner">
    <h1 className="text-base font-poppins font-semibold text-indigo-900">
      Developed by DBOIS
    </h1>
  </div>
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
  margin-top: 21px;
`;