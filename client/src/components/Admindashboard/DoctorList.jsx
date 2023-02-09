import  Axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import delete_btn from "../../assets/delete.png"

const DoctorList = (props) => {
  const navigate = useNavigate();
  const [docList, setdocList] = useState([]);

  const deleteDoctor =  (id) => {

    Axios.delete(`http://localhost:3001/Admin/DeleteDoctor/${id}`).then((response) => {
      setdocList(docList.filter((val) => {
        return val.id !== id
      }))
    });
};

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
        <div className="grid grid-cols-9 font-bold">
          <h1>Sr.No.</h1>
          <h1 className="col-span-2">Doctor Id</h1>
          <h1 className="col-span-1">Name</h1>
          <h1 className="col-span-2">Department</h1>
          {/* <h1 className="col-span-1">Department</h1> */}
          <h1 className="col-span-2">Contact</h1>
          <h1>Action</h1>
        </div>
        <hr></hr>
        {docList.length > 0 ? (
          docList.map((doctor, index) => {
            return (
              <div className="grid grid-cols-9">
      <h1 className="col-start-1">{index + 1}</h1>
      <h1 className="col-span-2">{doctor.DocID}</h1>
      <h1 className="col-span-1">{doctor.name}</h1>
      <h1 className="col-span-2">{doctor.dname +"(" + doctor.DID + ")"}</h1>
      <div className="col-span-2 pr-2">
        <h1 className="text-lg ">{doctor.phone}</h1>
        <h1 className="text-sm"> {doctor.email_address}</h1>
      </div>
      <div>
        <button
          className="flex items-center bg-primary w-24 h-9 rounded font-bold shadow hover:bg-bgsecondary"
          onClick={() => {deleteDoctor(doctor.DocID)}}
        >
          <img src={delete_btn} className="h-4 mx-2"></img>
         Delete
        </button>
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

export default DoctorList;