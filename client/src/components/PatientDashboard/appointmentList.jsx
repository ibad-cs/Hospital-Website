import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import delete_btn from "../../assets/delete.png"

const AppointmentList = (props) => {
  const navigate = useNavigate(); 
  const [ApptList, setApptList] = useState([]);
  const [PID,setPID] = useState(localStorage.getItem("ID"));
  const deleteAppt =  (id) => {

    Axios.delete(`http://localhost:3001/Patients/DeleteAppt/${id}`).then((response) => {
    });
    window.location.reload();
};

  useEffect(() => {
    const fetchApptList = () => {
        
     Axios.get(`http://localhost:3001/Patients/ViewAppointments/${PID}`).then((response) => {
          console.log(response);
          setApptList(response.data);
     });
    //   console.log(PID);
    };
    
    fetchApptList();
  }, []);

  return (
    <div className="m-4 mt-4 font-poppins col-span-10">
      <div>
        <h1 className="font-bold text-xl ml-16 mt-16">Appointment List</h1>
      </div>
      <div className="grid grid-rows-2 mt-8 m-14 mr-12  bg-white bg-opacity-40 rounded shadow p-6 gap-4">
        <div className="grid grid-cols-12 font-bold">
          <h1 className="col-span-2">Sr.No.</h1>
          <h1 className="col-span-2">Appt Id</h1>
          <h1 className="col-span-2">Doctor</h1>
          <h1 className="col-span-3">department</h1>
          <h1 className="col-span-2">Date</h1>
          <h1>Action</h1>
        </div>
        <hr></hr>
        {ApptList.length > 0 ? (
          ApptList.map((patient, index) => {
            return (
              <div className="grid grid-cols-12">
      <h1 className="col-start-0">{index + 1}</h1>
      <h1 className="col-start-2"></h1>
      <h1 className="col-span-2">{patient.ApID}</h1>
      <h1 className="col-span-2">{"Dr." + patient.docname}</h1>
      <h1 className="col-span-3">{patient.dname}</h1>
      <h1 className="col-span-2">{patient.Date}</h1>

    
      <div>
        <button
          className="flex items-center bg-primary w-24 h-8 rounded font-bold shadow hover:bg-bgsecondary"
          onClick={() => {deleteAppt(patient.ApID)}}
        >
          <img src={delete_btn} className="h-4 mx-2"></img>Delete
        </button>
      </div>
    </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            No Appointments are Found on System
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;