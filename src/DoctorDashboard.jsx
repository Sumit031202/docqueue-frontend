import { act, useEffect, useState } from "react";
import avatar from "./assets/user.svg"
import queue from "./assets/queue.svg"
import arrow from "./assets/arrow.svg"
import "./DoctorDashboard.css"

function DoctorDashboard(){

    const baseURL="https://api.docqueue.online"
    const [activePatient,setActivePatient]=useState({"fullName":"Nobody"})
    const [errorMessage,setErrorMessage]=useState("")
    const [waitingQueue,setWaitingQueue]=useState([]) // empty queue


    // live queue
    useEffect(()=>{
        const eventSource=new EventSource(`${baseURL}/api/patients/stream`);
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
            const response=await fetch(`${baseURL}/api/doctors/next`,{
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
                <div className="dashboard-header">
                    <h2>Doctor Dashboard</h2>
                    <div className="header-status">  
                        {/* will work on this feature later, when live it should glow green else red and show live time */}
                        {/* <span className="status-live">Live</span>  */}
                        {/* <span className="status-time"></span> */}
                    </div>
                </div>
                {/* <h2>Doctor Dashboard</h2> */}
                <div className="current-patient-card card">
                    <img className="avatar" src={avatar}></img>
                    {activePatient.fullName!=="Nobody"?
                    <div className="active-patient-info">
                        <h3>Currently Serving</h3>
                        <div className="active-token">#{activePatient.id}</div>
                        <div className="name">{activePatient.fullName}</div>
                    </div>
                    :<p>No active patient</p>}
                </div>
                <div className="next-patient-card card">
                    <button className="next-btn" onClick={callNextPatient} disabled={waitingQueue.length===0}>
                        <div className="aloo">Next Patient</div>
                        <div className="pyaaz"><img src={arrow} alt="" /></div>
                    </button>
                </div>
                <div className="queue-card card">
                    {waitingQueue.length===0?<h4>No Patients are in Queue</h4>:
                    <>  
                        <div className="queue-title">
                            <img src={queue} alt="" />
                            <div className="title">Live Queue ({waitingQueue.length})</div>
                        </div>
                        <ol>
                            {/* <li>
                                <div className="token-no">12</div>
                                <div className="patient-name">Ravi Kumar</div> 
                            </li> */}
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