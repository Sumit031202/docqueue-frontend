import Hero from "./components/Hero"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Workflow from "./components/Workflow"

function LandingPage(){
    return(
        <>
            <Hero/>
            <Workflow/>
        </>
    )
}
export default LandingPage