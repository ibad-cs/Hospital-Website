import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import delete_btn from "../../assets/delete.png"

const PatientList = (props) => {
  const navigate = useNavigate(); 
  const [patientList, setPatientList] = useState([]);

  const deletePatient =  (id) => {

    Axios.delete(`http://localhost:3001/Admin/DeletePatient/${id}`).then((response) => {
      setPatientList(patientList.filter((val) => {
        return val.id != id
      }))
    });
    window.location.reload();
};

  useEffect(() => {
    const fetchPatientList = () => {
     Axios.get("http://localhost:3001/Admin/ViewPatients").then((response) => {
          console.log(response);
          setPatientList(response.data);
     });
      
    };
    
    fetchPatientList();
  }, []);

  return (
    <div className="m-4 mt-4 font-poppins col-span-10">
      <div>
        <h1 className="font-bold text-xl ml-16 mt-16">Patient List</h1>
      </div>
      <div className="grid grid-rows-2 mt-8 m-14 mr-12  bg-white bg-opacity-40 rounded shadow p-6 gap-4">
        <div className="grid grid-cols-9 font-bold">
          <h1>Sr.No.</h1>
          <h1 className="col-span-2">Patient Id</h1>
          <h1 className="col-span-2">Name</h1>
          <h1 className="col-span-0">Age</h1>
          <h1 className="col-span-2">Contact</h1>
          <h1>Action</h1>
        </div>
        <hr></hr>
        {patientList.length > 0 ? (
          patientList.map((patient, index) => {
            return (
              <div className="grid grid-cols-9">
      <h1 className="col-start-1">{index + 1}</h1>
      <h1 className="col-span-2">{patient.PID}</h1>
      <h1 className="col-span-2">{patient.name}</h1>
      <h1 className="col-span-1">{patient.age}</h1>
      <div className="col-span-2 pr-2">
        <h1 className="text-lg ">{patient.phone}</h1>
        <h1 className="text-sm"> {patient.email_address}</h1>
      </div>
      <div>
        <button
          className="flex items-center bg-primary w-24 h-8 rounded font-bold shadow hover:bg-bgsecondary"
          onClick={() => {deletePatient(patient.PID)}}
        >
          <img src={delete_btn} className="h-4 mx-2"></img>Delete
        </button>
      </div>
    </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            No Patients are Found on System
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;