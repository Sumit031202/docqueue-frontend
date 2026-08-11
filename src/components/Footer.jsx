import "./Footer.css";
import Logo from "./Logo";

function Footer() {
    return (
        <>
            <section className="footer-cta">

                <div className="footer-cta-content">

                    <div className="footer-cta-badge">
                        BUILT FOR BETTER CLINICS
                    </div>

                    <h2>
                        Ready to provide a better
                        <br />
                        experience for your patients?
                    </h2>

                    <p>
                        Give your patients a smarter way to join and track
                        their queue without waiting in a crowded clinic.
                    </p>

                    <div className="footer-cta-buttons">
                        <button className="cta-primary">
                            Get Started
                            <span>→</span>
                        </button>

                        <button className="cta-secondary">
                            Find Clinics
                        </button>
                    </div>

                </div>

            </section>


            <footer className="footer">

                <div className="footer-main">

                    <div className="footer-brand">

                        <Logo />

                        <p>
                            Real-time queue management for clinics that
                            want to reduce waiting and give patients a
                            better experience.
                        </p>

                        <div className="social-links">
                            <a href="https://www.linkedin.com/in/sumit-burnwal/" target="_blank" aria-label="LinkedIn">in</a>
                            <a href="mailto:sumitkr.031202@gmail.com" aria-label="Email" target="_blank">M</a>
                        </div>

                    </div>


                    <div className="footer-column">

                        <h3>PRODUCT</h3>

                        <a href="#how-it-works">
                            How It Works
                        </a>

                        <a href="#find-clinics">
                            Find Clinics
                        </a>

                        <a href="#pricing">
                            Pricing
                        </a>

                    </div>


                    <div className="footer-column">

                        <h3>COMPANY</h3>

                        <a href="#">
                            About
                        </a>

                        <a href="#">
                            Contact
                        </a>

                        <a href="#">
                            FAQ
                        </a>

                    </div>


                    <div className="footer-column">

                        <h3>FOR CLINICS</h3>

                        <a href="#">
                            Doctor Login
                        </a>

                        <a href="#pricing">
                            Get Started
                        </a>

                        <a href="#">
                            Contact Us
                        </a>

                    </div>

                </div>


                <div className="footer-bottom">

                    <p>
                        © 2026 DocQueue. All rights reserved.
                    </p>

                    <p>
                        Built for better clinic experiences.
                    </p>

                </div>

            </footer>
        </>
    );
}

export default Footer;