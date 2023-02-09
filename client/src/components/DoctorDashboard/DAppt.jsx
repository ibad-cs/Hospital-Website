import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import delete_btn from "../../assets/delete.png"
import eye from "../../assets/eye.png";
import Historymodal from "./HistoryModal";
import PRegisterModal from "./PrescriptionModal";
const DAppt = (props) => {
  const navigate = useNavigate(); 
  const [PresModal,setPresModal] = useState(false);
  const [HistoryModal,setHistoryModal] = useState(false);
  const [ApptList, setApptList] = useState([]);
  const [PApptList, setPApptList] = useState([]);
  const [DID,setDID] = useState(localStorage.getItem("ID"));
  const [Toggle,setToggle] = useState("Active");
  const [PatientID,setPatientID] = useState("")
  const [His,setHis] = useState([]);
  const [medname,setmedName] = useState("");
  const [dosage,setdosage] = useState("");
  const [diagnosis,setdiagnosis] = useState("");
  

const [apptID,setapptID] = useState("");
const [date,setdate] = useState("");
const [DeptID,setDeptID] = useState("")
  const deleteAppt =  (id) => {

    Axios.delete(`http://localhost:3001/Doctor/DeleteAppt/${id}`).then((response) => {
    });
    window.location.reload();
};

const fetchHis = (patID) => {
    // console.log(PatientID);
 Axios.get(`http://localhost:3001/Doctor/ViewHistory/${patID}`).then((response) => {
      console.log(response.data);
      setHis(response.data);
      
      
 });
 
  
};

const regitser = (DID,PID,apptID,Date) => {
    Axios.post("http://localhost:3001/Doctor/Prescribe",{
        DID:DID,
        PID:PID,
        ApID:apptID,
        Date:Date,
        MedName:medname,
        Dosage:dosage,
        Diagnosis:diagnosis
    }).then((response) => 
    {
        
        
    });


    
            alert("Prescribed");
            setPresModal(false);
        
};



  useEffect(() => {
    const fetchPApptList = () => {
        
     Axios.get(`http://localhost:3001/Doctor/ViewPAppointments/${DID}`).then((response) => {
          console.log(response);
          setPApptList(response.data);
     });
    //   console.log(PID);
    };
    const fetchApptList = () => {
        
         Axios.get(`http://localhost:3001/Doctor/ViewAppointments/${DID}`).then((response) => {
              console.log(response);
              setApptList(response.data);
         });
        //   console.log(PID);
        };
    



    
    fetchPApptList();
    fetchApptList();
  }, []);

  return (
    <div className="m-4 mt-4 font-poppins col-span-10">
      <div>
        <h1 className="font-bold text-xl ml-16 mt-16">Appointment List</h1>
      </div>

      {/* button start */}
      
      <div className="flex flex-row bg-transparent pt-8 w-fit items-center justify-center  rounded">
      
      <button
        className={
          Toggle === "Active"
            ? "py-2 px-8 text-lg font-poppins font-bold text-white cursor-pointer rounded bg-gradient-to-r from-purple-900 to-blue-700"
            : "py-2 px-8 text-lg font-poppins font-semibold text-indigo-900 cursor-pointer rounded"
            
        }
        onClick={() => {
          setToggle("Active");
        
                    }}
      >
        Past
      </button>
      <button
        onClick={() => {
          setToggle("Past");
          
        }}
        className={
          Toggle === "Past"
            ? "py-2 px-8 text-lg font-poppins font-bold text-white cursor-pointer rounded bg-gradient-to-r from-purple-900 via-blue-700 to-purple-900"
            : "py-2 px-8 text-lg font-poppins font-semibold text-indigo-900 cursor-pointer rounded"
        }
      >
        Active
      </button>
     
      </div>



{/* button end */}
      <div className="grid grid-rows-2 mt-8 m-14 mr-12  bg-white bg-opacity-40 rounded shadow p-6 gap-4">
        <div className="grid grid-cols-12 font-bold">
          <h1 className="col-span-2">Sr.No.</h1>
          <h1 className="col-span-2">Appt Id</h1>
          <h1 className="col-span-2">Patient ID</h1>
          <h1 className="col-span-3">Patient Name</h1>
          <h1 className="col-span-2">Date</h1>
          <h1>Action</h1>
        </div>
        <hr></hr>

        {Toggle === "Past" ? 

ApptList.length > 0 ? (
    ApptList.map((Patient, index) => {
      return (
        <div className="grid grid-cols-12">
<h1 className="col-start-0">{index + 1}</h1>
<h1 className="col-start-2"></h1>
<h1 className="col-span-2">{Patient.ApID}</h1>
<h1 className="col-span-2">{Patient.patID}</h1>
<h1 className="col-span-3">{Patient.patname}</h1>
<h1 className="col-span-2">{Patient.Date}</h1>


<div>
  <button
    className="flex items-center bg-primary w-24 h-8 rounded font-bold shadow hover:bg-bgsecondary"
    onClick={() => {deleteAppt(Patient.ApID)}}
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
  )

         : 
         
         PApptList.length > 0 ? (
            PApptList.map((patient, index) => {
              return (
                <div className="grid grid-cols-12" key={patient.ApID}>
        <h1 className="col-start-0" >{index + 1}</h1>
        <h1 className="col-start-2"></h1>
        <h1 className="col-span-2">{patient.ApID}</h1>
        <h1 className="col-span-2">{patient.patID}</h1>
        <h1 className="col-span-3">{patient.patname}</h1>
        <h1 className="col-span-2">{patient.Date}</h1>
        {/* {setPatientID(patient.patID)} */}
        <div className="mb-2">
          <button
            className="flex items-center bg-primary w-24 h-8 mb-1 border-solid border-2  border-green-500 rounded font-bold shadow hover:bg-bgsecondary hover:bg-opacity-40"
            onClick={() => {setHistoryModal(true);fetchHis(patient.patID);}}
          >
            <img src={eye} className="h-4 mx-2"></img>
            History
          </button>
          {/* <Historymodal  PatientID={patient}/> */}
          {HistoryModal && 
          
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
                <button onClick={() => {setHistoryModal(false)}}>close</button>
           
            </div>


        </div>


    </div>
          
          
          }
          <button
            className="flex items-center justify-center  bg-primary w-24 h-8 mb-2 rounded font-bold shadow hover:bg-bgsecondary"
            onClick={() => {setPresModal(true)}}
          >
            {/* <img src={delete_btn} className="h-4 mx-2"></img>Delete */}
            Prescribe
          </button>

          {PresModal && 
          
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
                
                <Link to="/Doctor/appointment">  <button
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
                    onClick={() => {regitser(DID,patient.patID,patient.ApID,patient.Date)}}
                  >
                    Submit
                  </button>
                </div>
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
          )
         
         }
      
      </div>
    </div>
  );
};

export default DAppt;