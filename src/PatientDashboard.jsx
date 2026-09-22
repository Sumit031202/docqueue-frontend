import { act, useEffect } from "react";
import { useState } from "react"

// import svgs
import queue from "./assets/queue.svg"
import user from "./assets/user.svg"
import join from "./assets/join.svg"
import join2 from "./assets/join2.svg"
import { useParams } from "react-router-dom";
import styles from "./PatientDashboard.module.css"
import Logo from "./components/Logo.jsx"


function PatientDashboard() {
    const {doctorId}=useParams();
    const baseURL="https://api.docqueue.online"
    const [liveCount, setLiveCount] = useState(0);
    const [waitingQueue, setWaitingQueue] = useState([]);
    const [activePatient, setActivepatient] = useState({ "fullName": "Nobody" });
    const [patientName, setPatientName] = useState("");
    const [doctor,setDoctor]=useState({});
    const [errorMessage,setErrorMessage]=useState("");
    const [registrationMessage,setRegistrationMessage]=useState("")

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

    const handleSession=async()=> {
        if (!doctor?.startTime) {
            console.log("Doctor start time is not available yet");
            return;
        }
        const now=new Date();
        const [hours,minutes,seconds]=doctor.startTime.split(':').map(Number);
        const startTime=new Date();
        startTime.setHours(hours,minutes,seconds,0);
        try{
            const response=await fetch(`${baseURL}/api/public/${doctorId}/check`);
            if(!response.ok){
                setErrorMessage("Could not check session status");
                return;
            }
            const data=await response.json();
            console.log(data);
            if(now<startTime){
                if(data===true){
                    setRegistrationMessage("");
                    console.log("Registrations are open");
                }else{
                    setRegistrationMessage(`Registrations are not open yet, will open after ${startTime}`);
                    console.log("Registrations are not open yet");
                }
            }else if(now<endTime){
                setRegistrationMessage("")
                if(data===false){
                    console.log("session is being created...");
                    await fetch(`${baseURL}/api/public/${doctorId}/session`);
                }
                // patient can join
                console.log("you can register now")
            }
        }catch(error){
            setErrorMessage(error);
            console.log(error);
        }
    }

    useEffect(() => {
        const eventSource = new EventSource(`${baseURL}/api/public/stream/${doctorId}`);
        console.log(doctorId);
        eventSource.addEventListener("Queue-Update", (e) => {
            const queue = JSON.parse(e.data);
            console.log("hello")
            setLiveCount(queue.length);
            setWaitingQueue(queue);
        })
        eventSource.addEventListener("Active-Patient", (e) => {
            let patientData = JSON.parse(e.data);
            if (typeof patientData == "string") {
                patientData = JSON.parse(patientData);
            }
            setActivepatient(patientData);
        })
        eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        console.log("Ready state:", eventSource.readyState);
        };
        getDoctorInfo();
        return () => {
            eventSource.close();
        };
    }, [doctorId]);

    useEffect(() => {
        if (doctor.startTime) {
            handleSession();
        }
    }, [doctor.startTime]);

    const handleNameChange = (e) => {
        setPatientName(e.target.value);
    }

    const register = async () => {
        const response = await fetch(`${baseURL}/api/patients/queue/join/${doctorId}?name=${patientName}`, {
            method: "POST"
        })
        const data = await response.json();
        console.log(data);
        setPatientName("");
    }

    return (
        <div className={styles.patientDashboardContainer}>
            <header className={styles.dashboardHeader}>
                <div className={styles.headerTitleGroup}>
                    <Logo></Logo>
                </div>
            </header>
            {registrationMessage && (
                <div className={styles.registrationMessage}>{registrationMessage}
                </div>
            )}
            <section className={styles.formCard}>
                <div className={styles.formHeader}>
                    <img className={styles.icon} src={join} alt="" />
                    <h3>Join Queue</h3>
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        onChange={handleNameChange}
                        value={patientName}
                        placeholder="Enter Patient Full Name..."
                    />
                    <button className={styles.joinBtn} onClick={register}>
                        <img className={styles.icon} src={join2} alt="" />Join Queue
                    </button>
                </div>
            </section>

            <div className={styles.dashboardGrid}>
                <div className={styles.currentPatientCard}>
                    <div className={styles.cardBodyRow}>
                        <img className={styles.avatar} src={user} alt="" />

                        <div className={styles.patientDetails}>
                            <div className={styles.cardAccentHeader}>Currently Serving</div>

                            {activePatient.fullName !== "Nobody" ? (
                                <>
                                    <div className={styles.activeName}>{activePatient.fullName}</div>
                                </>
                            ) : (
                                <div className={styles.activeName}>No Active Patient</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={styles.waitingCountCard}>
                    <div className={styles.cardAccentHeader}>Patients Currently Waiting</div>
                    <div className={styles.cardBodyRow}>
                        <img className={styles.avatar} src={queue} alt="" />
                        <div className={styles.waitingNumberDetails}>
                            <div className={styles.waitingCount}>{liveCount}</div>
                            <div className={styles.waitingLabel}>Patients</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.queueCard}>
                                {waitingQueue.length===0?<h4>No Patients are in Queue</h4>:
                                <>  
                                    <div className={styles.queueTitle}>
                                        <img src={queue} alt="" />
                                        <div className={styles.title}>Live Queue ({waitingQueue.length})</div>
                                    </div>
                                    <ol>
                                        {waitingQueue.map((patient,index)=>{
                                            return <li key={patient.id}>
                                                <div className={styles.tokenNo}>{index+1}</div>
                                                <div className={styles.patientName}>{patient.fullName}</div>
                                            </li>
                                        })}
                                    </ol>
                                </>
                                }
                            </div>
        </div>
    );

}
export default PatientDashboard