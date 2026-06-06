import { useEffect } from "react";
import { useState } from "react"

function LiveTracker(){
    const [liveCount,setLiveCount]=useState(0);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/api/patients/stream");
    eventSource.addEventListener("Queue-Update",(e)=>{
        setLiveCount(parseInt(e.data));
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
        </>
    )

}
export default LiveTracker