import Hero from "./components/Hero"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Workflow from "./components/Workflow"
import Benefits from "./components/Benefits"

function LandingPage(){
    return(
        <>
            <Hero/>
            <Workflow/>
            <Benefits/>
        </>
    )
}
export default LandingPage