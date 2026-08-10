import { act, useEffect } from "react";
import { useState } from "react"
import "./PatientDashboard.css"

// import svgs
import queue from "./assets/queue.svg"
import user from "./assets/user.svg"
import join from "./assets/join.svg"
import join2 from "./assets/join2.svg"
import logo from "./assets/docqueue.svg"
import { useParams } from "react-router-dom";


function PatientDashboard() {
    const {doctorId}=useParams();
    const baseURL="https://api.docqueue.online"
    const [liveCount, setLiveCount] = useState(0);
    const [waitingQueue, setWaitingQueue] = useState([]);
    const [activePatient, setActivepatient] = useState({ "fullName": "Nobody" });
    const [patientName, setPatientName] = useState("");

    useEffect(() => {
        const eventSource = new EventSource(`${baseURL}/api/patients/stream?doctorId=${doctorId}`);
        console.log(doctorId);
        eventSource.addEventListener("Queue-Update", (e) => {
            const queue = JSON.parse(e.data);
            console.log("hello")
            // console.log(data);
            // console.log(data.length);
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
        return () => {
            eventSource.close();
        };
    }, [doctorId]);

    const handleNameChange = (e) => {
        setPatientName(e.target.value);
    }

    const register = async () => {
        const response = await fetch(`${baseURL}/api/patients/queue/join/${doctorId}/${patientName}`, {
            method: "POST"
        })
        const data = await response.json();
        console.log(data);
        setPatientName("");
    }

    return (
        <div className="patient-dashboard-container">
            {/* 1. Header Section */}
            <header className="dashboard-header">
                <div className="header-title-group">
                    {/* SVG/Icon placeholder matching the design icon */}
                    <img className="logo-icon" src={logo} alt="docqueue" />
                    {/* <span className="logo-icon">📊</span> */}
                    <h2>Patient Dashboard</h2>
                </div>
            </header>

            {/* 2. Join Queue Form Card */}
            <section className="form-card card">
                <div className="form-header">
                    <img className="icon" src={join} alt="" />
                    {/* <span className="icon">👤+</span> */}
                    <h3>Join Queue</h3>
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        onChange={handleNameChange}
                        value={patientName}
                        placeholder="Enter Patient Full Name..."
                    />
                    <button className="join-btn" onClick={register}>
                        <img className="icon" src={join2} alt="" />Join Queue
                    </button>
                </div>
            </section>

            {/* 3. Horizontal Grid: Serving and Waiting Cards */}
            <div className="dashboard-grid">
                {/* Currently Serving Card */}
                <div className="current-patient-card card">
                    <div className="card-body-row">
                        <img className="avatar" src={user} alt="" />

                        {/* All content on the right side is now grouped together here */}
                        <div className="patient-details">
                            <div className="card-accent-header">Currently Serving</div>

                            {activePatient.fullName !== "Nobody" ? (
                                <>
                                    <div className="active-token">#{activePatient.id}</div>
                                    <div className="active-name">{activePatient.fullName}</div>
                                </>
                            ) : (
                                <div className="active-name">No Active Patient</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Patients Currently Waiting Card */}
                <div className="waiting-count-card card">
                    <div className="card-accent-header accent-blue">Patients Currently Waiting</div>
                    <div className="card-body-row">
                        <img className="avatar blue-bg" src={queue} alt="" />
                        <div className="waiting-number-details">
                            <div className="waiting-count">{liveCount}</div>
                            <div className="waiting-label">Patients</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Live Queue List Card */}
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
    );

}
export default PatientDashboard