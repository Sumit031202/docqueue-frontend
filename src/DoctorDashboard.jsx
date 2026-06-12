import { useState } from "react";

function DoctorDashboard(){
    const [patientName,setPatientName]=useState("")
    const [activePatient,setActivepatient]=useState()
    const [errorMessage,setErrorMessage]=useState("")

    const handleNameChange=(e)=>{
        setPatientName(e.target.value);
    }
    const register=async()=>{
        const response=await fetch(`http://localhost:8080/api/patients/queue/join/${patientName}`,{
            method: "POST"
        })
        const data=await response.json();
        console.log(data);
        setPatientName("");
    }

    const callNextPatient=async()=>{
        const response=await fetch("http://localhost:8080/api/doctors/next",{
            method:"PUT"
        })
        let rawText=await response.text();
        try{
            const data=JSON.parse(rawText);
            setActivepatient(data.fullName);
            setErrorMessage("");
        }catch(e){
            setActivepatient("");
            setErrorMessage(rawText);
        }
    }
    return(
        <>
            <input onChange={handleNameChange} type="text" value={patientName} placeholder="Enter Patient Full Name..." />
            <button onClick={register}>Register Patient</button>

            <button onClick={callNextPatient}>Next Patient</button>
            {errorMessage==""? activePatient && <p>{activePatient} is being served now</p>:<p>{errorMessage}</p>}
        </>
    )
}
export default DoctorDashboard;