import { act, useEffect } from "react";
import { useState } from "react"

function PatientDashboard(){
    const [liveCount,setLiveCount]=useState(0);
    const [waitingQueue,setWaitingQueue]=useState([]);
    const [activePatient,setActivepatient]=useState("Nobody");
    const [patientName,setPatientName]=useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/api/patients/stream");
    eventSource.addEventListener("Queue-Update",(e)=>{
        const queue=JSON.parse(e.data);
        // console.log(data);
        // console.log(data.length);
        setLiveCount(queue.length);
        setWaitingQueue(queue);
    })
    eventSource.addEventListener("Active-Patient",(e)=>{
        let patientData=JSON.parse(e.data);
        if(typeof patientData=="string"){
            patientData=JSON.parse(patientData);
        }
        setActivepatient(patientData.fullName);
    })
        return () => {
            eventSource.close();
        };
    }, []);

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
            <div className="Patient" style={{border:"2px solid black",margin:"5px"}}>
                <p>Patients Currently Waiting: {liveCount}</p>
                <div>
                    <input onChange={handleNameChange} type="text" value={patientName} placeholder="Enter Patient Full Name..." />
                    <button onClick={register}>Register Patient</button>
                    <h1>Live Queue Monitor</h1>
                </div>
                {activePatient!=="Nobody" && activePatient.fullName!=="Nobody"?(
                    <p><strong>{activePatient}</strong> is being served now</p>
                ):(
                    <p>Nobody is in the Queue</p>
                )}
                <ul>
                    {waitingQueue.map((patient)=>{
                        return <li key={patient.id}>{patient.fullName}</li>
                    })}
                </ul>
            </div>
        </>
    )

}
export default PatientDashboard