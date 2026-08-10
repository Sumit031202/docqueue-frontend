import FindClinics from "./FindClinics";
import LandingPage from "./LandingPage";
import PatientDashboard from "./PatientDashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {

  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/find-clinics" element={<FindClinics/>}></Route>
        <Route path="/patients/:doctorId" element={<PatientDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
