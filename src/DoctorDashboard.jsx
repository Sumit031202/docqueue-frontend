import { useEffect, useState } from "react";
import avatar from "./assets/avatar.svg"
import queue from "./assets/queue.svg"
import styles from "./DoctorDashboard.module.css"
import { useParams } from "react-router-dom";
import Logo from "./components/Logo";
import shutdown from './assets/shutdown.svg'
import clock from './assets/clock.svg'
import cancel from "./assets/cancel.svg"
import info from "./assets/info.svg"
import end from "./assets/end.svg"

function DoctorDashboard(){
    const {doctorId}=useParams()
    const baseURL="https://api.docqueue.online"
    const [activePatient,setActivePatient]=useState({"fullName":"Nobody"})
    const [errorMessage,setErrorMessage]=useState("")
    const [waitingQueue,setWaitingQueue]=useState([])
    const [doctor,setDoctor]=useState({});
    const [sessionMessage,setSessionMessage]=useState("");
    const formattedDate = new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    const [waitingTime,setWaitingTime]=useState();
    const [isSessionActive,setIsSessionActive]=useState(false);


    // live queue
    useEffect(()=>{
        if(!isSessionActive){
            return;
        }
        const eventSource=new EventSource(`${baseURL}/api/public/stream/${doctorId}`);
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
        eventSource.addEventListener("Average-Waiting-Time",(e)=>{
            const time=JSON.parse(e.data);
            setWaitingTime(time);
        })
        return () => {
            eventSource.close();
        };
    },[doctorId,isSessionActive])

    const callNextPatient=async()=>{
        try{
            const response=await fetch(`${baseURL}/api/doctors/${doctorId}/next`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
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
    const startSession=async()=>{
        try{
            const response=await fetch(`${baseURL}/api/doctors/${doctorId}/session`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(!response.ok){
                let errorMessage=await response.text();
                setErrorMessage(errorMessage);
            }else{
                setIsSessionActive(true);
                setErrorMessage("");
                setSessionMessage("");
            }
        }catch(e){
            setErrorMessage("Network Error: could not reach backend");
            console.log(e);
        }
    }
    const endSession=async()=>{
        try{
            const response=await fetch(`${baseURL}/api/doctors/${doctorId}/end`,{
                method:"PATCH",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(!response.ok){
                let errorMessage=await response.text();
                setErrorMessage(errorMessage);
            }else{
                setErrorMessage("");
                setIsSessionActive(false);
                setWaitingQueue([]);
                setActivePatient({"fullName":"Nobody"});
                setSessionMessage("Session have not started yet, click on start session");
            }
        }catch(e){
            setErrorMessage("Network Error: could not reach backend");
            console.log(e);
        }
    }
    const checkSession=async()=> {
        try{
            const response=await fetch(`${baseURL}/api/public/${doctorId}/check`);
            if(!response.ok){
                setErrorMessage("Could not check session status");
                return;
            }
            const data=await response.json();
            console.log(data);
            if(data===true){
                setIsSessionActive(true);
                setSessionMessage("");
                return;
            }
            setIsSessionActive(false);
            setSessionMessage("Session have not started yet, click on start session");
        }catch(error){
            setErrorMessage(error);
            console.log(error);
        }
    }
    const handleNoShow=async()=>{
        try{
            const response=await fetch(`${baseURL}/api/doctors/${doctorId}/missed`,{
            method:"POST",
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
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

    const getDoctorInfo=async()=>{
        try{
            const response=await fetch(`${baseURL}/api/public/${doctorId}`,{
            method:"GET"
            })
            if(!response.ok){
                let errorMessage=await response.text();
                setErrorMessage(errorMessage);
                return;
            }
            const data=await response.json();
            setDoctor(data);
            console.log(data);
            setErrorMessage("");
        }catch(e){
            setErrorMessage("Network Error: could not reach backend");
            console.log(e);
        }
    }
    useEffect(()=>{
        getDoctorInfo()
        checkSession();
    },[doctorId])
    return(
        <div className={styles.doctorDashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <Logo/>
                </div>
                <div className={styles.headerStatus}>
                    <button className={styles.onOff} onClick={startSession}>
                        <img className={styles.logo} src={shutdown} alt="on/off" />
                    </button>
                </div>
            </div>
            {sessionMessage && (
                <div className={styles.sessionMessage}>{sessionMessage}</div>
            )}
            <div className={styles.sessionOverview}>
                <div className={styles.sessionDetails}>
                    <p>Today's Clinic Session</p>
                    <h3>{formattedDate}</h3>
                    <div className={styles.badge}>Session Active</div>
                </div>
                <div className={styles.sessionControl}>
                    <p>Session Control</p>
                    <button onClick={endSession}><img src={end} alt="play/pause"/>End Session</button>
                    <p>End the session when the clinic is finished</p>
                </div>
            </div>
            <div className={styles.dashboardMain}>
                <div className={styles.liveQueue}>
                    <div className={styles.waitingCard}>
                        <img className={styles.logo} src={queue} alt="" />
                        <div className={styles.cardDetails}>
                            <h3>{waitingQueue.length}</h3>
                            <p>Patients Waiting</p>
                        </div>
                    </div>
                    <div className={styles.avgWaitingCard}>
                        <img className={styles.logo} src={clock} alt="waiting" />
                        <div className={styles.cardDetails}>
                            <h3>{waitingTime==null?"--":`~${Math.floor(waitingTime)} m`}</h3>
                            <p>Average Waiting Time</p>
                        </div>
                    </div>
                </div>
                <div className={styles.currentPatientPanel}>
                    <h3>Current Patient</h3>
                    <div>
                        <img src={avatar} alt="user" />
                        <div className={styles.activePatient}>{activePatient.fullName}</div>
                        <button onClick={handleNoShow}><img src={cancel} alt="cancel" />Mark as No Show</button>
                    </div>
                </div>
                {/* next patient button */}
                <div className={styles.nextPatientCard}>
                    <button className={styles.nextBtn} onClick={callNextPatient} disabled={waitingQueue.length===0}>
                        <div className={styles.nextBtnContent}>Call Next Patient</div>
                    </button>
                </div>
            </div>
            <div className={styles.queueSection}>
                <div className={styles.queueCard}>
                    {waitingQueue.length===0?
                    <div className={styles.emptyQueue}>No Patients are in Queue</div>:
                    <>
                        <div className={styles.queueTitle}>
                            <img className={styles.queueIcon} src={queue} alt="" />
                            <div className={styles.queueTitleText}>Live Queue ({waitingQueue.length})</div>
                        </div>
                        <ol className={styles.queueList}>
                            {waitingQueue.map((patient,index)=>{
                                return(
                                    <li className={styles.queueItem} key={patient.id}>
                                        <div className={styles.tokenNo}>{index+1}</div>
                                        <div className={styles.patientName}>{patient.fullName}</div>
                                    </li>
                                )
                            })}
                        </ol>
                    </>
                    }
                </div>
                <div className={styles.queueActions}>
                    
                    <div className={styles.infoCard}>
                        <img src={info} alt="information" />
                        <p>
                            Use <b>Mark as No Show</b> if the current patient is not present.<br/>
                            Use <b>End Session</b> only when the clinic is finished for the day.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DoctorDashboard;