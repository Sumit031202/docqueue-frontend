import "./Hero.css"
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
                            Find Clinics
                            <span>→</span>
                        </button>
                        <button className="secondary-btn">
                            Register Clinic
                            <span>→</span>
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
                    <div className="dashboard-preview"></div>
                    <div className="patient-preview"></div>
                </section>
            </div>
        </section>
    )
}
export default Hero