// import  Axios  from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { response } from "../../../../server/patientroutes";
// import delete_btn from "../../assets/delete.png"

// const PDoctorList = (props) => {
//   const navigate = useNavigate();
//   const [docList, setdocList] = useState([]);
//   const [DID,setDID] = useState("");
//   const [DeptId,setDeptId]=useState("");
//   const [Date,setDate]=useState("");
//   const [Comments,setComments]=useState("filler");
//   const [ID,setID] = useState(localStorage.getItem("ID"));
  

//   const BookAppointment = (DocID,deptID) => {
   
//       setDID(DocID);
//       setDeptId(deptID);

//       console.log("Enter in func")
//           console.log(Date + " " + DeptId + " " + DID + " " + ID + " " + Comments);

//     // Axios.post("http://localhost:3001/Patients/BookAppointments",{
//     // Date: Date,
//     // DeptId: DeptId,
//     // DID: DID,
//     // ID: ID,
//     // Comments: Comments
//     // }).then((response) => {

//     // });
// };
// // useEffect(()=>{
// //     if(Date && DeptId && DID ){
// //     // await Axios.post("http://localhost:3001/Patients/BookAppointments",{
// //     // Date: Date,
// //     // DeptId: DeptId,
// //     // DID: DID,
// //     // ID: ID,
// //     // Comments: Comments
// //     // }).then((response) => {

// //     // });}

// // },[DeptId]
// // )
//   useEffect(() => {
//     const fetchdocList = () => {
//      Axios.get("http://localhost:3001/Admin/ViewDoctors").then((response) => {
//           console.log(response);
//           setdocList(response.data);
//           console.log(JSON.stringify(docList));
//      });
      
//     };
    
//     fetchdocList();
//   }, []);

//   return (
//     <div className="m-4 mt-4 font-poppins col-span-10">
//       <div>
//         <h1 className="font-bold text-xl ml-16 mt-16">Doctor List</h1>
//       </div>
//       <div className="grid grid-rows-2 mt-8 m-14 mr-12  bg-white bg-opacity-40 rounded shadow p-6 gap-4">
//         <div className="grid grid-cols-10 font-bold">
//           <h1 className="col-span-1">Sr.No.</h1>
//           {/* <h1 className="col-span-2">Doctor Id</h1> */}
//           <h1 className="col-span-2">Name</h1>
//           <h1 className="col-span-3">Department</h1>
//           {/* <h1 className="col-span-1">Department</h1> */}
//           <h1 className="col-span-3">Contact</h1>
//           <h1 className="col-span-1">Action</h1>
//         </div>
//         <hr></hr>
//         {docList.length > 0 ? (
//           docList.map((doctor, index) => {
//             return (
              
//               <div className="grid grid-cols-10 border-solid border-4 rounded p-2">
//       <h1 className="col-span-1">{index + 1}</h1>
//       {/* <h1 className="col-span-2">{doctor.DocID}</h1> */}
//       <h1 className="col-span-2">{doctor.name}</h1>
//       <h1 className="col-span-3">{doctor.dname}</h1>
//       <div className="col-span-3 pr-2">
//         <h1 className="text-lg ">{doctor.phone}</h1>
//         <h1 className="text-sm"> {doctor.email_address}</h1>
//       </div>
//       <div className="flex flex-col  w-24 h-13 border-solid border-2 border-indigo-300 rounded font-bold shadow">
//         <input type="date"  onChange={(e) => {setDate(e.target.value)}}/>
//         <button className="bg-primary  hover:bg-bgsecondary"
//         //   BookAppoin(doctor.DocID)
//           // onClick={() => {setDID(doctor.DocID);setDeptId(doctor.DID);BookAppointment()}}
//           onClick={() => {BookAppointment(doctor.DocID,doctor.DID)}}

        
//         >
//             {/* (doctor.DocID,doctor.DID) */}
//     {/* <img src={delete_btn} className="h-4 mx-2"></img> */}
//         Appointment
        
     
//         </button>
        
//       </div>
//     </div>
//             );
//           })
//         ) : (
//           <div className="flex justify-center items-center">
//             No Doctors are Found on System
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDoctorList;
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { response } from "../../../../server/patientroutes";
import delete_btn from "../../assets/delete.png";

const PDoctorList = (props) => {
  const navigate = useNavigate();
  const [docList, setdocList] = useState([]);
  const [DID, setDID] = useState("");
  const [DeptId, setDeptId] = useState("");
  const [Date, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [Comments, setComments] = useState("filler");
  const [ID, setID] = useState(localStorage.getItem("ID"));

  const BookAppointment = (DocID, deptID, index) => {
    setError(null);
    // if (!Date || !DeptId || !DocID || !ID || !Comments) return;
    if (!Date) {
      setError({
        errorIndex: index,
        errorMsg: "Please select appointment date.",
      });
      return;
    }

    setDID(DocID);
    setDeptId(deptID);
                  //  console.log(Date + " " + DeptId + " " + DID + " " + ID + " " + Comments);

    Axios.post("http://localhost:3001/Patients/BookAppointments", {
      Date: Date,
      DeptId: deptID,
      DID: DocID,
      ID: ID,
      Comments: Comments,
    }).then((response) => {
               console.log(Date + " " + DeptId + " " + DID + " " + ID + " " + Comments);

    });
  };
  // useEffect(()=>{
  //     if(Date && DeptId && DID ){
  //     // await Axios.post("http://localhost:3001/Patients/BookAppointments",{
  //     // Date: Date,
  //     // DeptId: DeptId,
  //     // DID: DID,
  //     // ID: ID,
  //     // Comments: Comments
  //     // }).then((response) => {

  //     // });}

  // },[DeptId]
  // )
  useEffect(() => {
    const fetchdocList = () => {
      Axios.get("http://localhost:3001/Admin/ViewDoctors").then((response) => {
        console.log(response);
        setdocList(response.data);
      });
    };

    fetchdocList();
  }, []);

  return (
    <div className="m-4 mt-4 font-poppins col-span-10">
      <div>
        <h1 className="font-bold text-xl ml-16 mt-16">Doctor List</h1>
      </div>
      <div className="grid grid-rows-2 mt-8 m-14 mr-12  bg-white bg-opacity-40 rounded shadow p-6 gap-4">
        <div className="grid grid-cols-10 font-bold">
          <h1 className="col-span-1">Sr.No.</h1>
          {/* <h1 className="col-span-2">Doctor Id</h1> */}
          <h1 className="col-span-2">Name</h1>
          <h1 className="col-span-3">Department</h1>
          {/* <h1 className="col-span-1">Department</h1> */}
          <h1 className="col-span-3">Contact</h1>
          <h1 className="col-span-1">Action</h1>
        </div>
        <hr></hr>
        {docList.length > 0 ? (
          docList.map((doctor, index) => {
            return (
              <div className="grid grid-cols-10 border-solid border-4 rounded p-2">
                <h1 className="col-span-1">{index + 1}</h1>
                {/* <h1 className="col-span-2">{doctor.DocID}</h1> */}
                <h1 className="col-span-2">{doctor.name}</h1>
                <h1 className="col-span-3">{doctor.dname}</h1>
                <div className="col-span-3 pr-2">
                  <h1 className="text-lg ">{doctor.phone}</h1>
                  <h1 className="text-sm"> {doctor.email_address}</h1>
                </div>
                <div className="flex flex-col  w-24 h-13 border-solid border-2 border-indigo-300 rounded font-bold shadow">
                  <input
                    type="date"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                  <button
                    className="bg-primary  hover:bg-bgsecondary"
                    //   BookAppoin(doctor.DocID)
                    // onClick={() => {setDID(doctor.DocID);setDeptId(doctor.DID);BookAppointment()}}
                    onClick={() => {
                      BookAppointment(doctor.DocID, doctor.DID, index);
                    }}
                  >
                    {/* (doctor.DocID,doctor.DID) */}
                    {/* <img src={delete_btn} className="h-4 mx-2"></img> */}
                    Appointment
                  </button>
                  {index === error?.errorIndex && (
                    <p className="text-red-400 text-xs t-12">
                      {error?.errorMsg}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            No Doctors are Found on System
          </div>
        )}
      </div>
    </div>
  );
};

export default PDoctorList;