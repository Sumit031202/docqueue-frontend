import { act, useEffect, useState } from "react";

function DoctorDashboard(){
    // const [patientName,setPatientName]=useState("")
    const [activePatient,setActivePatient]=useState()
    const [errorMessage,setErrorMessage]=useState("")
    const [waitingQueue,setWaitingQueue]=useState([]) // empty queue


    // live queue
    useEffect(()=>{
        const eventSource=new EventSource("http://localhost:8080/api/patients/stream");
        eventSource.addEventListener("Queue-Update",e=>{
            const queue=JSON.parse(e.data);
            console.log(queue);
            setWaitingQueue(queue);
        })
        eventSource.addEventListener("Active-Patient",(e)=>{
            let patientData=JSON.parse(e.data);
            if(typeof patientData=="string"){
                patientData=JSON.parse(patientData);
            }
            if(patientData && patientData.fullName){
                setActivePatient(patientData.fullName);
            }else{
                setActivePatient("Nobody");
            }
        })
        return () => {
            eventSource.close();
        };
    },[])

    // const handleNameChange=(e)=>{
    //     setPatientName(e.target.value);
    // }

    const callNextPatient=async()=>{
        
        try{
            const response=await fetch("http://localhost:8080/api/doctors/next",{
            method:"PUT"
            })
            if(!response.ok){
                let errorMessage=await response.text();
                setErrorMessage(errorMessage);
            }else{
                setErrorMessage("");
            }
        }catch(e){
            setErrorMessage("Network Error: could not reach backend");
        }
    }
    return(
        <>
            {/* <input onChange={handleNameChange} type="text" value={patientName} placeholder="Enter Patient Full Name..." /> */}
            {/* <button onClick={register}>Register Patient</button> */}

            <div className="Doctor" style={{border:"2px solid black",display:"flex"}}>
                <button onClick={callNextPatient}>Next Patient</button>
                <hr />
                {activePatient!=="Nobody"?<p>
                {activePatient} is being served now</p>:
                <p>Nobody is being served now</p>}

                <ul>
                    {waitingQueue.map((patient)=>{
                        return <li key={patient.id}>{patient.fullName}</li>
                    })}
                </ul>
            </div>
        </>
    )
}
export default DoctorDashboard;