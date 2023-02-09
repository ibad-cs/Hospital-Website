import logo from "../../assets/logo.png";
import dashboard from "../../assets/dashboard.jpeg";
import reports from "../../assets/report2_pbl.png";
import patient_history from "../../assets/patient_history.jpeg";
import patient_profile from "../../assets/patient2_pbl.png";
import doctor_list from "../../assets/doctor_list.png";

import logoutimg from "../../assets/logout.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import add_doctor from "../../assets/add_doctor.png";

import { useState } from "react";

const PatientProfileSideBar = (props) => {
  const navigate = useNavigate();
//   const logout = async () => {
//     const res = await fetch("/logout");
//     props.settoastCondition({
//       status: "success",
//       message: "Logged out Successfully!!!",
//     });
//     props.setToastShow(true);
//     navigate("/");
//   };
const Logout =  () => {
  console.log("logged out");
  localStorage.clear();
      navigate("/");
      // window.location.reload();

}
  const [Toggle, setToggle] = useState("Dashboard");

  return (
    <div className="h-screen overflow-y-hidden w-screen grid grid-cols-12">
      <div className="side_bar bg-white bg-opacity-40 shadow col-span-2">
        <div className="flex m-2 mt-4  ">
          <div className="logo m-2  ">
            <img src={logo} className="w-16" alt="logo"></img>
          </div>
          <div className="heading font-poppins font-bold text-xl  ">
            <Link to="/patient/appointments">
              <h1>Public health Record System</h1>
            </Link>
          </div>
        </div>
        <nav>
          <Link
            to="/patient/dashboard"
            onClick={() => setToggle("Dashboard")}
            className={
              Toggle === "Dashboard" ? "text-gray-900" : "text-gray-400"
            }
          >
            <div className="flex m-2 mt-8 ">
              <div className="w-6 ml-4  ">
                <img src={dashboard} alt="dashboard"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Dashboard</h1>
              </div>
            </div>
          </Link>

          <Link
            to="/patient/report"
            onClick={() => setToggle("Reports")}
            className={Toggle === "Reports" ? "text-gray-900" : "text-gray-400"}
          >
            <div className="flex m-2 mt-6  ">
              <div className="w-6 ml-4  ">
                <img src={reports} alt="reports"></img>
              </div>
              <div className="font-poppins font-bold ml-4">
                <h1>Reports</h1>
              </div>
            </div>
          </Link>

          <div className="p-4">
            <h1 className="font-poppins font-bold text-xl mt-4">Main menu</h1>
            <div className="grid grid-rows-2 gap-4 font-bold font-poppins mt-4">
              <Link
                to="/patient/appointments"
                onClick={() => setToggle("Patient_history")}
                className={
                  Toggle === "Patient_history"
                    ? "text-gray-900 "
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <img
                    src={patient_history}
                    className="w-6"
                    alt="history"
                  ></img>
                  <h1 className="ml-4">Appointments</h1>
                </div>
              </Link>
              {/* <Link
                // to="/patient/profile"
                onClick={() => setToggle("Patient_profile")}
                className={
                  Toggle === "Patient_profile"
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                <div className="flex p-2">
                  <img
                    src={patient_profile}
                    className="w-6"
                    alt="profile"
                  ></img>
                  <h1 className="ml-4">Patient Profile</h1>
                </div>
              </Link> */}

              <Link
                to="/patient/doctorlist"
                onClick={() => setToggle("Patient_doclist")}
                className={
                  Toggle === "Patient_doclist"
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                <div className="flex  mt-2 ">
                  <div className="w-6 ml-2  ">
                    <img src={doctor_list} alt="doctor-list"></img>
                  </div>
                  <div className="font-poppins font-bold ml-4">
                    <h1>Doctor List</h1>
                  </div>
                </div>
              </Link>

             
            </div>
          </div>
        </nav>

        <div className=" mx-auto mt-56 py-1    bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-2/5  ">
          <button className="font-bold  flex items-center" onClick={Logout}>
            <img src={logoutimg} className="h-4 px-2 " alt="logout"></img>logout
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default PatientProfileSideBar;