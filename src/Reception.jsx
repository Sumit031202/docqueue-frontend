import { useState } from "react";

function Reception(){
    const[patientName,setPatientName]=useState("")

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
    return(
        <>
            <input onChange={handleNameChange} type="text" value={patientName} placeholder="Enter Patient Full Name..." />
            <button onClick={register}>Register Patient</button>
        </>
    )
}
export default Reception;