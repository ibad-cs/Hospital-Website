import React from 'react'
import  Axios  from "axios";
import { useEffect, useState } from "react";



const HistoryModal = ({PatientID}) => {

const [His,setHis] = useState([]);
var data;
useEffect(() => {
    const fetchHis = () => {
        console.log(PatientID);
    //  Axios.get(`http://localhost:3001/Doctor/ViewHistory/${setPatientID}`).then((response) => {
    //       console.log(response.data);
    //       setHis(response.data);
          
          
    //  });
     
      
    };
    
    fetchHis();
  }, []);


return (

    <div className="bg-zinc-200 opacity-80 fixed inset-0 z-50">

        <div className="flex h-screen justify-center items-center">

            <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl">
            

                <div  className="flex text-lg text-zinc-600 mb-10">
                     {
                        His.length >=1 ? His.map((record,idx) => {
                            return <p key={idx}>MID: {record.MID} <br /> History: {record.record} </p>
                        }) : 'sdsds'                   
                    }

                </div>
                <button onClick={() => {}}>close</button>
           
            </div>


        </div>


    </div>

   

);

}
export default HistoryModal;
