import { useEffect, useState } from "react";
import "./FindClinics.css"
import doctor_logo from "./assets/doctor_icon.svg"

const baseURL = import.meta.env.VITE_BACKEND_URL

function FindClinics() {

  const [errorMessage, setErrorMessage] = useState("")
  const [doctors, setDoctors] = useState([])

  const getDoctors = async () => {
    try{
      let response = await fetch(`${baseURL}/api/doctors`);
      if (!response.ok) {
        const data = await response.text();
        setErrorMessage(data);
      } else {
        const data = await response.json();
        setDoctors(data);
      }
    }catch(e){
      console.error(e);
      setErrorMessage("Network Error: could not reach backend");
    }
  }

  useEffect(() => {
    getDoctors();
  }, [])

  return (
    <section className="find-clinics">
      <section className="find-clinics-header">
        <div className="badge">AVAILABLE CLINICS</div>
        <div className="find-clinics-title">
          <h2>Find a clinic and Join the Queue</h2>
          <p>Find your doctor, check the live queue, and join without
        waiting in a crowded clinic.</p>
        </div>
      </section>
      <section className="clinics-container">
        {doctors.map((doctor) => (
          <div className="clinic-card" key={doctor.id}>
            <div className="clinic-title">
              <img className="icon" src={doctor_logo} alt="doctor_icon" />
              <div className="doctor-details">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialization}</p>
              </div>
            </div>
            <div className="queue-status">
              <div className="queue-status-title">
                <span className="dot"></span>
                <span>Live Queue</span>
              </div>
              <strong>Queue is currently active</strong>
            </div>
            <button className="join-queue-btn">Join/View Queue</button>
          </div>
        ))}

      </section>
    </section>
  )
}
export default FindClinics