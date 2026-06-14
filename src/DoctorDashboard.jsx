import { act, useEffect, useState } from "react";

function DoctorDashboard(){
    // const [patientName,setPatientName]=useState("")
    // "{\"fullName\":\"Nobody\"}"
    const [activePatient,setActivePatient]=useState({"fullName":"Nobody"})
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
                setActivePatient(patientData);
            }else{
                setActivePatient({"fullName":"Nobody"});
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
            console.log(e);
        }
    }
    return(
        <>
            <div className="doctor-dashboard">
                <h2>Doctor Dashboard</h2>
                <div className="current-patient-card card">
                    <h3>Currently Serving</h3>
                    {activePatient.fullName!=="Nobody"?
                    <p>{activePatient.fullName} {activePatient.id}</p>:
                    <p>No active patient</p>}
                </div>
                <div className="next-patient-card card">
                    <button className="next-btn" onClick={callNextPatient} disabled={waitingQueue.length===0}>
                        Next Patient
                    </button>
                </div>
                <div className="queue-card card">
                    {waitingQueue.length===1?<h4>No Patients are in Queue</h4>:
                    <>
                        <h4>Live Queue ({waitingQueue.length})</h4>
                        <ol>
                            <li>
                                <div className="token-no">12</div>
                                <div className="patient-name">Ravi Kumar</div> 
                            </li>
                            {waitingQueue.map((patient)=>{
                                return <li key={patient.id}>
                                    <div className="token-no">{patient.id}</div>
                                    <div className="patient-name">{patient.fullName}</div>
                                </li>
                            })}
                        </ol>
                    </>
                    }
                </div>
            </div>
        </>
    )
}
export default DoctorDashboard;