import "./Benefits.css"
function Benefits() {
    return (
        <section className="benefits">

            <div className="badge">
                BENEFITS
            </div>

            <div className="benefits-title">
                <h2>Benefits for Everyone</h2>
                <p>
                    Tailored features that keep both patients and practitioners happy.
                </p>
            </div>

            <div className="benefits-info">

                {/* Patient Benefits */}
                <div className="benefits-card">

                    <div className="benefits-card-title">
                        <div className="benefits-icon">
                            👤
                        </div>

                        <h3>For Patients</h3>
                    </div>

                    <ul className="benefits-list">

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>Live Queue:</strong>{" "}
                                See the exact running queue registry and your
                                position in real-time.
                            </p>
                        </li>

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>Estimated Waiting Time:</strong>{" "}
                                Know how many minutes until you meet the doctor.
                            </p>
                        </li>

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>Know Clinic Status:</strong>{" "}
                                Realize immediately if the doctor is running late
                                or the clinic is closed.
                            </p>
                        </li>

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>Browser Notifications:</strong>{" "}
                                Get alerts on your mobile browser when your turn
                                is coming.
                            </p>
                        </li>

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>Peace of Mind:</strong>{" "}
                                No more asking the receptionist,
                                "Mera number kab aayega?"
                            </p>
                        </li>

                    </ul>
                </div>


                {/* Doctor Benefits */}
                <div className="benefits-card">

                    <div className="benefits-card-title">
                        <div className="benefits-icon">
                            ⚙
                        </div>

                        <h3>For Doctors</h3>
                    </div>

                    <ul className="benefits-list">

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>One-Click Management:</strong>{" "}
                                Advance the queue instantly with a simple
                                "Call Next" control.
                            </p>
                        </li>

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>Premium Patient Experience:</strong>{" "}
                                Relieve patient anxiety and clear crowded
                                waiting rooms.
                            </p>
                        </li>

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>Daily Statistics:</strong>{" "}
                                Gain insights on peak hours and average time
                                spent per patient.
                            </p>
                        </li>

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>Reduce Staff Overhead:</strong>{" "}
                                Receptionists get interrupted less by queue
                                status questions.
                            </p>
                        </li>

                        <li>
                            <span>✓</span>
                            <p>
                                <strong>QR-Based Sign-In:</strong>{" "}
                                Place a QR poster in your cabin for immediate
                                contact-free patient checkout.
                            </p>
                        </li>

                    </ul>
                </div>

            </div>

        </section>
    );
}

export default Benefits;