import doctor_profile from "../assets/admin_profile.png";
import patient_profile from "../assets/patient2_pbl.png";
import DAppt from "../components/DoctorDashboard/DAppt";
import search from "../assets/search2.png";
import AppointmentList from "../components/PatientDashboard/appointmentList";
import Footer from "../components/landingPage/Footer";
import DoctorList from "../components/Admindashboard/DoctorList";
import PatientList from "../components/Admindashboard/PatientList";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { response } from "../../../server/doctorroutes";

const PatDashboard = (props) => {
  const [docname, setdocname] = useState("");
  const [ID,setID]=useState(localStorage.getItem("ID"));
  const navigate = useNavigate();
 

  return (
    <div className="full-body col-span-10">
      <div className="body  h-screen max-h-min bg-transparent ">
        <div className="main  m-2  ">
          {/* dashboard today start */}
          <div className="">
            <div className="flex  h-12 m-2 bg-transparent  rounded ml-6 ">
              <Link to="/AdminDash">
                <div>
                  <h1 className="text-2xl font-poppins font-bold p-2 ">
                  DashBoard Today
                  </h1>
                </div>
              </Link>

              <div className="flex ml-20  h-10   ">
                <input
                  placeholder="Search"
                  className="w-96 rounded ml-4 text-xl   pl-4 border focus:outline-none "
                ></input>
                <div className="bg-white opacity-40 pl-2 rounded ">
                  <img
                    src={search}
                    className=" h-6 mt-2  cursor-pointer"
                    alt="search"
                  ></img>
                </div>
              </div>

              <div className="flex bg-white opacity-40 rounded shadow   px-4  ml-60 h-14 ">
                <img
                  src={doctor_profile}
                  className="h-12 my-1  p-1 rounded-2xl"
                  alt="profile"
                ></img>
                <div className="flex items-center ml-4  font-bold font-poppins">
                  <h1>{"Patient ID: " + ID} </h1>
                </div>
              </div>
            </div>
            <div>
             <AppointmentList></AppointmentList>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer></Footer> */}
    </div>
  );
};

export default PatDashboard;