import Hero from "./components/Hero"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Workflow from "./components/Workflow"
import Benefits from "./components/Benefits"
import Pricing from "./components/Pricing"
import Footer from "./components/Footer"

function LandingPage(){
    return(
        <>
            <Hero/>
            <Workflow/>
            <Benefits/>
            <Pricing/>
            <Footer/>
        </>
    )
}
export default LandingPage