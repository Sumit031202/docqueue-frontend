import { act, useEffect } from "react";
import { useState } from "react"
import "./PatientDashboard.css"

// import svgs
import queue from "./assets/queue.svg"
import user from "./assets/user.svg"
import join from "./assets/join.svg"
import join2 from "./assets/join2.svg"
import logo from "./assets/docqueue.svg"


function PatientDashboard() {
    const [liveCount, setLiveCount] = useState(0);
    const [waitingQueue, setWaitingQueue] = useState([]);
    const [activePatient, setActivepatient] = useState({ "fullName": "Nobody" });
    const [patientName, setPatientName] = useState("");

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:8080/api/patients/stream");
        eventSource.addEventListener("Queue-Update", (e) => {
            const queue = JSON.parse(e.data);
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
        return () => {
            eventSource.close();
        };
    }, []);

    const handleNameChange = (e) => {
        setPatientName(e.target.value);
    }

    const register = async () => {
        const response = await fetch(`http://localhost:8080/api/patients/queue/join/${patientName}`, {
            method: "POST"
        })
        const data = await response.json();
        console.log(data);
        setPatientName("");
    }

    // return (
    //     <div className="patient-dashboard-container">
    //         <div className="Patient" style={{ border: "2px solid black", margin: "5px" }}>
    //             <p>Patients Currently Waiting: {liveCount}</p>
    //             <div>
    //                 <input onChange={handleNameChange} type="text" value={patientName} placeholder="Enter Patient Full Name..." />
    //                 <button onClick={register}>Register Patient</button>
    //                 <h1>Live Queue Monitor</h1>
    //             </div>
    //             {activePatient !== "Nobody" && activePatient.fullName !== "Nobody" ? (
    //                 <p><strong>{activePatient}</strong> is being served now</p>
    //             ) : (
    //                 <p>Nobody is in the Queue</p>
    //             )}
    //             <ul>
    //                 {waitingQueue.map((patient) => {
    //                     return <li key={patient.id}>{patient.fullName}</li>
    //                 })}
    //             </ul>
    //         </div>
    //     </>
    // )

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
            <section className="queue-card card">
                <div className="queue-header">
                    <img src={queue} alt="" />
                    <h3>Live Queue ({liveCount})</h3>
                </div>
                <ol className="queue-list">
                    {waitingQueue.map((patient) => (
                        <li key={patient.id} className="queue-item">
                            <div className="item-left">
                                <span className="token-badge">{patient.id}</span>
                                <span className="patient-name">{patient.fullName}</span>
                            </div>
                            {/* Optional chevron matching the design image indicators */}
                            <span className="chevron">›</span>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );

}
export default PatientDashboard