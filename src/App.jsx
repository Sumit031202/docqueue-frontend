import FindClinics from "./FindClinics";
import LandingPage from "./LandingPage";
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {

  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/find-clinics" element={<FindClinics/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
