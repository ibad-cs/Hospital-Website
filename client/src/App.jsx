import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import PatientList from "./components/Admindashboard/PatientList";
import RegisterModal from "./components/Admindashboard/RegisterModal";
import AdminSidebar from "./components/Admindashboard/AdminSideBar";
import SideBar from "./components/Admindashboard/Sidebar";
import DoctorList from "./components/Admindashboard/DoctorList";
import PatientProfileSideBar from "./components/PatientDashboard/pSidebar";
import PDoctorList from "./components/PatientDashboard/pDoctorList";
import ApptList from "./components/PatientDashboard/appointmentList";
import DSidebar from "./components/DoctorDashboard/DSidebar";
import DAppt from "./components/DoctorDashboard/DAppt";
import DocDashboard from "./pages/DoctorDashboard";
import PatDashboard from "./pages/PatientDashboard";
import Dprescription from "./components/DoctorDashboard/Dprescription";
import Preports from "./components/PatientDashboard/Preports";
// import PRegisterModal from "./components/DoctorDashboard/PrescriptionModal";
import "./App.css";
import {Routes, Route} from "react-router-dom";
function App() {
  return <>
  {/* <PRegisterModal /> */}
  {/* <DAppt /> */}
  {/* <DSidebar /> */}
  {/* <ApptList /> */}
  {/* <PatientProfileSideBar /> */}
  {/* <PDoctorList /> */}
  {/* <SideBar /> */}
  {/* <RegisterModal /> */}
  {/* <DoctorList /> */}
     {/* <LandingPage /> */}
     {/* <AdminSidebar /> */}
    {/* <PatientList /> */}
     {/* <AdminDashboard /> */}
     {/* <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1> */}

<div className=" flex"> 
      <Routes>
       <Route path="/" element={<LandingPage />}>
          
         
       </Route>
        <Route
          path="admin"
          element={
            <AdminSidebar            
            />
          }
        >
          <Route
            path="dashboard"
            element={
              <AdminDashboard
              
              />
            }
          />
          <Route
            path="doctorslist"
            element={
              <DoctorList
               
              />
            }
          />
          <Route
            path="patientslist"
            element={
              <PatientList
                
              />
            }
          />
          <Route
            path="registerdoctor"
            element={
              <RegisterModal
                
              />
            }
          />

        </Route>

{/* patient routes */}
 <Route
          path="patient"
          element={
            <PatientProfileSideBar            
            />
          }
        >
          <Route
            path="dashboard"
            element={
              <PatDashboard
              
              />
            }
          />
          <Route
            path="doctorlist"
            element={
              <PDoctorList
               
              />
            }
          /> 
          <Route
            path="appointments"
            element={
              <ApptList
                
              />
            }
          />
          <Route
            path="report"
            element={
              <Preports
                
              />
            }
          />

        </Route>
        {/* doctor routes */}
        <Route
          path="doctor"
          element={
            <DSidebar           
            />
          }
        >
          <Route
            path="dashboard"
            element={
              <DocDashboard
              
              />
            }
          />
          <Route
            path="appointment"
            element={
              <DAppt
               
              />
            }
          /> 
            <Route
            path="report"
            element={
              <Dprescription
               
              />
            }
          /> 
         
         

        </Route>


       </Routes>
     </div> 
    </>
 }



export default App;