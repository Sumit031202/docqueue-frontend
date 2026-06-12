import { useEffect } from "react";
import { useState } from "react"

function PatientDashboard(){
    const [liveCount,setLiveCount]=useState(0);
    const [waitingQueue,setWaitingQueue]=useState([]);
    const [activePatient,setActivepatient]=useState();

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
        const patient=JSON.parse(e.data).fullName;
        setActivepatient(patient);
    })
        return () => {
            eventSource.close();
        };
    }, []);

    return(
        <>
            <div>
                <h1>Live Queue Monitor</h1>
            </div>
            <p>Patients Currently Waiting: {liveCount}</p>
            <p>
                {activePatient} is being served now (Live Tracker)
            </p>
            <ul>
                {waitingQueue.map((patient)=>{
                    return <li key={patient.id}>{patient.fullName}</li>
                })}
            </ul>
        </>
    )

}
export default PatientDashboard