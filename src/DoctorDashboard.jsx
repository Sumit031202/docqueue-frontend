import { useEffect, useState } from "react";
import avatar from "./assets/avatar.svg"
import queue from "./assets/queue.svg"
import arrow from "./assets/arrow.svg"
import styles from "./DoctorDashboard.module.css"
import { useParams } from "react-router-dom";

function DoctorDashboard(){
    const {doctorId}=useParams()
    const baseURL="https://api.docqueue.online"
    const [activePatient,setActivePatient]=useState({"fullName":"Nobody"})
    const [errorMessage,setErrorMessage]=useState("")
    const [waitingQueue,setWaitingQueue]=useState([]) // empty queue


    // live queue
    useEffect(()=>{
        const eventSource=new EventSource(`${baseURL}/api/patients/stream?doctorId=${doctorId}`);
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
            // console.log(`${baseURL}/api/doctors/${doctorId}/next`);
            // console.log(localStorage.getItem("token"));
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
    return(
        <div className={styles.doctorDashboard}>
            <div className={styles.dashboardHeader}>
                <div>
                    <h2 className={styles.dashboardTitle}>Doctor Dashboard</h2>
                    <p>Manage your live patient queue</p>
                </div>
                <div className={styles.headerStatus}>
                    <span className={styles.statusLive}>
                        <span className={styles.dot}></span>
                        Live
                    </span>
                </div>
            </div>
            <div className={styles.dashboardMain}>
                <div className={styles.currentPatientCard}>
                    <img className={styles.avatar} src={avatar} alt="" />
                    {activePatient.fullName!=="Nobody"?
                    <div className={styles.activePatientInfo}>
                        <p className={styles.activePatientLabel}>Currently Serving</p>
                        {/* <div className={styles.activeToken}>#{activePatient.id}</div> */}
                        <div className={styles.name}>{activePatient.fullName}</div>
                    </div>
                    :<p className={styles.emptyPatient}>No active patient</p>}
                </div>
                <div className={styles.nextPatientCard}>
                    <button className={styles.nextBtn} onClick={callNextPatient} disabled={waitingQueue.length===0}>
                        <div className={styles.nextBtnContent}></div>
                        <div className={styles.nextBtnArrow}><img src={arrow} alt="" /></div>
                    </button>
                </div>
            </div>
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
        </div>
    )
}
export default DoctorDashboard;