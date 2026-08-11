import "./Pricing.css";

function Pricing() {
    return (
        <section className="pricing">

            {/* Section Header */}
            <div className="pricing-header">
                <div className="badge">PRICING</div>

                <h2>Simple, Transparent Pricing</h2>

                <p>
                    Zero setup fees. Pay-as-you-go flat monthly subscription
                    with no hidden charges.
                </p>
            </div>


            {/* Pricing Card */}
            <div className="pricing-card">

                {/* Founding Member Badge */}
                <div className="founding-badge">
                    FOUNDING MEMBER RATE
                </div>


                {/* Left Side */}
                <div className="pricing-offer">

                    <div className="limited-badge">
                        LIMITED RELEASE
                    </div>

                    <h3>Founding Clinics Offer</h3>

                    <p className="offer-description">
                        Get DocQueue for ₹299/month for your first 12 months.
                        Limited to the first 100 clinics
                    </p>

                    <div className="price">
                        <span className="price-value">₹299</span>
                        <span className="price-period">/ month</span>
                    </div>

                    <p className="billing-info">
                        ✓ Billed monthly • Cancel anytime
                    </p>

                    <button className="pricing-btn">
                        Get Started Now
                        <span>→</span>
                    </button>

                </div>


                {/* Divider */}
                <div className="pricing-divider"></div>


                {/* Right Side */}
                <div className="pricing-features">

                    <h4>EVERYTHING INCLUDED IN YOUR PLAN:</h4>

                    <div className="features-grid">

                        <div className="feature-item">
                            <span className="feature-check">✓</span>

                            <div>
                                <strong>Unlimited Patients</strong>
                                <p>No caps on daily tokens or registration</p>
                            </div>
                        </div>


                        <div className="feature-item">
                            <span className="feature-check">✓</span>

                            <div>
                                <strong>Live SSE Telemetry</strong>
                                <p>Instant real-time browser sync</p>
                            </div>
                        </div>


                        <div className="feature-item">
                            <span className="feature-check">✓</span>

                            <div>
                                <strong>Doctor Console Dashboard</strong>
                                <p>One-click "Call Next" control</p>
                            </div>
                        </div>


                        <div className="feature-item">
                            <span className="feature-check">✓</span>

                            <div>
                                <strong>Printable QR Posters</strong>
                                <p>Desk QR code poster generation</p>
                            </div>
                        </div>


                        <div className="feature-item">
                            <span className="feature-check">✓</span>

                            <div>
                                <strong>WhatsApp Priority Support</strong>
                                <p>Direct executive onboarding setup</p>
                            </div>
                        </div>


                        <div className="feature-item">
                            <span className="feature-check">✓</span>

                            <div>
                                <strong>No App Downloads</strong>
                                <p>Runs 100% in mobile browsers</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Pricing;