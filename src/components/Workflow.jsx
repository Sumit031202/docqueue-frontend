import "./Workflow.css"
function Workflow(){

    return(
        <section className="workflow" id="how-it-works">
            <div className="badge">PROCESS FLOW</div>
            <div className="workflow-title">
                <h2>How DocQueue Works</h2>
                <p>Get joined and tracked in three simple steps without downloads.</p>
            </div>
            <div className="workflow-info">
                <div className="workflow-card">
                    <div className="card-title">
                        <div>1</div>
                        <h3>Scan QR/Open Clinic Page</h3>
                    </div>
                    <div className="card-info">Scan the clinic's reception desk QR code or open their dedicated page url from anywhere.</div>
                </div>
                <div className="workflow-card">
                    <div className="card-title">
                        <div>2</div>
                        <h3>Join Live Queue</h3>
                    </div>
                    <div className="card-info">Enter your full name and patient details to instantly secure your token number in one click.</div>
                </div>
                <div className="workflow-card">
                    <div className="card-title">
                        <div>3</div>
                        <h3>Track Your Turn Live</h3>
                    </div>
                    <div className="card-info">See live updates of serving tokens, get browser alerts, and arrive exactly when the doctor is ready.</div>
                </div>
            </div>
        </section>
    )
}
export default Workflow;