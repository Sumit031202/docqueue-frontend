import { useEffect, useState } from "react";
import avatar from "./assets/avatar.svg"
import queue from "./assets/queue.svg"
import arrow from "./assets/arrow.svg"
import styles from "./DoctorDashboard.module.css"
import { useParams } from "react-router-dom";
import Logo from "./components/Logo";
import shutdown from './assets/shutdown.svg'
import clock from './assets/clock.svg'
import cancel from "./assets/cancel.svg"
import info from "./assets/info.svg"
import edit from "./assets/edit.svg"
import pause from "./assets/pause.svg"
import play from "./assets/play.svg"

function DoctorDashboard(){
    const {doctorId}=useParams()
    const baseURL="http://localhost:8080"
    const [activePatient,setActivePatient]=useState({"fullName":"Nobody"})
    const [errorMessage,setErrorMessage]=useState("")
    const [waitingQueue,setWaitingQueue]=useState([])
    const [doctor,setDoctor]=useState({});


    // live queue
    useEffect(()=>{
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
        getDoctorInfo()
        return () => {
            eventSource.close();
        };
    },[doctorId])

    // const handleNameChange=(e)=>{
    //     setPatientName(e.target.value);
    // }

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
            }
        }catch(e){
            setErrorMessage("Network Error: could not reach backend");
            console.log(e);
        }
    }
    const toggleStatus=async()=>{
        try{
            const response=await fetch(`${baseURL}/api/doctors/${doctorId}/toggle`,{
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
            }
        }catch(e){
            setErrorMessage("Network Error: could not reach backend");
            console.log(e);
        }
    }
    const updateSession=async()=>{
        try{
            const response=await fetch(`${baseURL}/api/doctors/${doctorId}/session`,{
                method:"PUT",
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
    return(
        <div className={styles.doctorDashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <Logo/>
                </div>
                <div className={styles.headerStatus}>
                    <button className={styles.onOff} onClick={endSession}>
                        <img className={styles.logo} src={shutdown} alt="on/off" />
                    </button>
                </div>
            </div>
            <div className={styles.sessionOverview}>
                <div className={styles.sessionDetails}>
                    <p>Today's Clinic Session</p>
                    <h3>Wed, 17 Sept 2026</h3>
                    <div className={styles.badge}>Session Active</div>
                </div>
                <div className={styles.clinicTimings}>
                    <p>
                        <img src={clock} alt="clock" />
                        Clinic Timings
                    </p>
                    <div>
                        <h3>10:00 AM - 01:00 PM</h3>
                        <button onClick={updateSession}><img src={edit} alt="edit" />Update</button>
                    </div>
                    <p>You can update the timings anytime. The session will follow the latest timings.</p>
                </div>
                <div className={styles.sessionControl}>
                    <p>Session Control</p>
                    <button onClick={toggleStatus}><img src={pause} alt="play/pause"/>Pause Session</button>
                    <p>Take a break. You can resume anytime.</p>
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
                    <div className={styles.currentPatientCard}>
                        <img className={styles.logo} src={avatar} alt="user" />
                        <div className={styles.cardDetails}>
                            <h3>{activePatient.fullName}</h3>
                            <p>Currently Serving</p>
                        </div>
                    </div>
                    <div className={styles.avgWaitingCard}>
                        <img className={styles.logo} src={clock} alt="waiting" />
                        <div className={styles.cardDetails}>
                            <h3>{doctor.consultationTime==null?"--":`~${Math.floor(doctor.consultationTime)} m`}</h3>
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
                    <div className={styles.nextPatientCard}>
                        <button className={styles.nextBtn} onClick={callNextPatient} disabled={waitingQueue.length===0}>
                            <div className={styles.nextBtnContent}>Call Next Patient</div>
                            <div className={styles.nextBtnArrow}><img src={play} alt="" /></div>
                        </button>
                    </div>
                    <div className={styles.infoCard}>
                        <img src={info} alt="information" />
                        <p>
                            Use Pause if you're taking a short break.
                            Use Mark as No Show if the current patient is not present.
                            Use End Session only when the clinic is finished for the day.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DoctorDashboard;