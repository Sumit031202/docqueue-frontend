import FindClinics from "./FindClinics";
import LandingPage from "./LandingPage";
import PatientDashboard from "./PatientDashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route,useLocation } from "react-router-dom";
import Register from "./components/Register";
import { useState } from "react";
import DoctorLogin from "./components/DoctorLogin";

function AppContent(){
  const location=useLocation();
  const hideNavbar=location.pathname.startsWith('/patients') || location.pathname.startsWith('/register') 
  const [isLoginOpen,setIsLoginOpen]=useState(false);
  return(
  <>
    {!hideNavbar && <Navbar onLoginClick={()=>setIsLoginOpen(true)}/>}
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/find-clinics" element={<FindClinics/>}></Route>
      <Route path="/patients/:doctorId" element={<PatientDashboard/>}></Route>
      <Route path="/register" element={<Register
      onLoginClick={()=>setIsLoginOpen(true)}/>}></Route>
    </Routes>
    {isLoginOpen && (
      <DoctorLogin onClose={()=>setIsLoginOpen(false)}/>
    )}
  </>)
}

function App() {
  return(
    <BrowserRouter>
    <AppContent/>
    </BrowserRouter>
  );
}

export default App
