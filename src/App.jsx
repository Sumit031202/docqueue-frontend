import FindClinics from "./FindClinics";
import LandingPage from "./LandingPage";
import PatientDashboard from "./PatientDashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route,useLocation } from "react-router-dom";
import Register from "./components/Register";

function AppContent(){
  const location=useLocation();
  const hideNavbar=location.pathname.startsWith('/patients/')
  return(
  <>
    {!hideNavbar && <Navbar/>}
    <Routes>
      <Route path="/" element={<LandingPage/>}></Route>
      <Route path="/find-clinics" element={<FindClinics/>}></Route>
      <Route path="/patients/:doctorId" element={<PatientDashboard/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
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
