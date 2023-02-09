import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import delete_btn from "../../assets/delete.png"
import eye from "../../assets/eye.png";
const Dprescription = (props) => {
  const navigate = useNavigate(); 
  const [ApptList, setApptList] = useState([]);
  const [PID,setPID] = useState(localStorage.getItem("ID"));
  const [His,setHis] = useState([]);
const [preview,setPreview]  = useState(false);
const fetchHis = (ApID) => {
    // console.log(PatientID);
 Axios.get(`http://localhost:3001/Doctor/ViewPres/${ApID}`).then((response) => {
      console.log(response.data);
      setHis(response.data);
      
      
 });
 
  
};
  useEffect(() => {
    const fetchApptList = () => {
        
     Axios.get(`http://localhost:3001/Doctor/ViewPAppointments/${PID}`).then((response) => {
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
        <h1 className="font-bold text-xl ml-16 mt-16">Reports</h1>
      </div>
      <div className="grid grid-rows-2 mt-8 m-14 mr-12  bg-white bg-opacity-40 rounded shadow p-6 gap-4">
        <div className="grid grid-cols-12 font-bold">
          <h1 className="col-span-2">Sr.No.</h1>
          <h1 className="col-span-2">Appt Id</h1>
          <h1 className="col-span-2">Patient ID</h1>
          <h1 className="col-span-3">Patient Name</h1>
          <h1 className="col-span-2">Date</h1>
          <h1>Prescriptions</h1>
        </div>
        <hr></hr>
        {ApptList.length > 0 ? (
          ApptList.map((patient, index) => {
            return (
              <div className="grid grid-cols-12">
    <h1 className="col-start-0" >{index + 1}</h1>
        <h1 className="col-start-2"></h1>
        <h1 className="col-span-2">{patient.ApID}</h1>
        <h1 className="col-span-2">{patient.patID}</h1>
        <h1 className="col-span-3">{patient.patname}</h1>
        <h1 className="col-span-2">{patient.Date}</h1>

    
      <div>
        <button
          className="flex items-center bg-primary w-24 h-8 rounded font-bold shadow hover:bg-bgsecondary"
          onClick={() => {setPreview(true);fetchHis(patient.ApID);}}
        >
          <img src={eye} className="h-4 mx-2"></img>preview
        </button>
        {preview && 
            <div className="bg-zinc-200 opacity-80 fixed inset-0 z-50">

            <div className="flex h-screen justify-center items-center">
    
                <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl">
                
    
                    <div  className="flex text-lg text-zinc-600 mb-10">
                         {
                            His.length >=1 ? His.map((record,idx) => {
                                return <p key={idx}>
                                    <h1 className="justify-center font-bold">------Prescription------</h1>
                                    Doctor Name: {record.name} <br />Patient Name : {record.paname} <br /> Prescription Date : {record.Date} <br />Medicine Name: {record.MedName} <br />Dosage : {record.Dosage} <br /> Diagnosis : {record.Diagnosis} </p>
                            }) : 'No prescription'                   
                        }
    
                    </div>
                    <button onClick={() => {setPreview(false)}}>close</button>
               
                </div>
    
    
            </div>
    
    
        </div>
        }
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

export default Dprescription;