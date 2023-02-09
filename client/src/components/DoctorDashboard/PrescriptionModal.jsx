import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
const PRegisterModal = ({setPresModal,setPatientID,setDID,setapptID,setdate}) => {

  // const [showModal, setShowModal] = useState(false);
  const [medname,setmedName] = useState("");
  const [dosage,setdosage] = useState("");
  const [diagnosis,setdiagnosis] = useState("");
 


// const regitser = () => {
//     Axios.post("http://localhost:3001/Doctor/Prescribe",{
//         DID:setDID,
//         PID:setPatientID,
//         ApID:setapptID,
//         Date:setdate,
//         MedName:medname,
//         Dosage:dosage,
//         Diagnosis:diagnosis
//     }).then((response) => {console.log(response);});
// };

const display = () => {
    console.log(setDID + setPatientID + setapptID + setdate + medname+ dosage+ diagnosis);
}



  return (
    <>
     
      
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white bg-opacity-40 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Prescription Form</h3>
                 
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 bg-opacity-80 shadow-md rounded px-8 pt-6 pb-8 w-full">
                   
                    <label className="block text-black text-sm font-bold mb-1">
                      Medicine Name
                    </label>
                    <input className="shadow appearance-none  border rounded w-full py-2 px-1 text-black" onChange={(e) => {setmedName(e.target.value)}}/>
                    <label className="block text-black text-sm font-bold mb-1">
                      Dosage
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange={(e) => {setdosage(e.target.value)}}/>
                    <label className="block text-black text-sm font-bold mb-1">
                      Diagnosis
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange={(e) => {setdiagnosis(e.target.value)}}/>
                  
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                
                <Link to="/admin/dashboard">  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {setPresModal(false)}}

                  >
                    Close
                  </button>
                  </Link>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={display}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
     
    </>
  );
};

export default PRegisterModal;