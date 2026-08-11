import Hero from "./components/Hero"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Workflow from "./components/Workflow"
import Benefits from "./components/Benefits"
import Pricing from "./components/Pricing"

function LandingPage(){
    return(
        <>
            <Hero/>
            <Workflow/>
            <Benefits/>
            <Pricing/>
        </>
    )
}
export default LandingPage