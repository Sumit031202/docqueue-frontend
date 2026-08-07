import "./Hero.css"
import arrow from "../assets/arrow.svg"
function Hero() {
    return (
        <section className="hero">
            <div className="hero-container">

                <section className="hero-left">
                    <div className="badge">
                        {/* <span>IN</span> */}
                        <p>MADE FOR CLINICS. BUILT FOR INDIA.</p>
                    </div>
                    <header className="hero-content">
                        <h1>
                            Patients Wait Less.
                            <br />
                            Clinics Run Better.
                        </h1>
                    </header>
                    <p className="hero-description">
                        Join your doctor's queue online, track your live position, and
                        arrive at the right time while helping clinics manage patients
                        efficiently.
                    </p>
                    <div className="hero-buttons">
                        <button className="primary-btn">
                            <span>🔍</span>
                            Find Clinics
                        </button>
                        <button className="secondary-btn">
                            Register Clinic
                            <span><img src={arrow} alt="arrow" /></span>
                        </button>
                    </div>
                    <ul className="trust-points">
                        <li>
                            <span>✔️</span>
                            <p>No App Download</p>
                        </li>
                        <li>
                            <span>✔️</span>
                            <p>Setup in 10 Minutes</p>
                        </li>
                        <li>
                            <span>✔️</span>
                            <p>Live Queue Tracking</p>
                        </li>
                    </ul>
                </section>
                <section className="hero-right">
                    <div className="dashboard-preview">
                        <div className="preview-header">
                            <h3>Doctor Dashboard</h3>
                            <div className="live-status">
                                <span className="live-dot"></span>
                                Live
                            </div>
                        </div>
                        <div className="metrics">
                            <div className="metric-card">
                                <p>Current</p>
                                <h2>14</h2>
                            </div>
                            <div className="metric-card">
                                <p>Waiting</p>
                                <h2>8</h2>
                            </div>
                            <div className="metric-card">
                                <p>Completed</p>
                                <h2>45</h2>
                            </div>
                            <div className="metric-card">
                                <p>Avg. Wait</p>
                                <h2>22 min</h2>
                            </div>
                        </div>
                        <div className="current-queue">
                            <h4>Current Queue</h4>
                            <ul>
                                <li><span>14</span>Ravi Kumar</li>
                                <li><span>15</span>Sunita Devi</li>
                                <li><span>16</span>Asif Ali</li>
                                <li><span>17</span>Pooja Singh</li>
                            </ul>
                        </div>
                        <div className="next">
                            <button>Call Next Patient</button>
                        </div>
                    </div>
                    <div className="patient-preview">
                        <h3>Your Queue Status</h3>
                        <div className="token-box">
                            <p>Your Token</p>
                            <h1>#14</h1>
                        </div>
                        <div className="patient-info">
                            <div>
                                <span>Patient Ahead</span>
                                <strong>3</strong>
                            </div>

                            <div>
                                <span>Estimated Wait</span>
                                <strong>22 min</strong>
                            </div>
                            <div>
                                <span>Clinic Open</span>
                                <strong className="open">
                                    <div className="live-dot"></div>
                                    <span>Open</span>
                                </strong>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}
export default Hero