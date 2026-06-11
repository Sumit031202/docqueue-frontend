import { useEffect } from "react";
import { useState } from "react"

function LiveTracker(){
    const [liveCount,setLiveCount]=useState(0);
    const [waitingQueue,setWaitingQueue]=useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/api/patients/stream");
    eventSource.addEventListener("Queue-Update",(e)=>{
        const queue=JSON.parse(e.data);
        // console.log(data);
        // console.log(data.length);
        setLiveCount(queue.length);
        setWaitingQueue(queue);
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
            <ul>
                {waitingQueue.map((patient)=>{
                    return <li key={patient.id}>{patient.fullName}</li>
                })}
            </ul>
        </>
    )

}
export default LiveTracker