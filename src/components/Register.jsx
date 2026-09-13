import Logo from "./Logo"
import styles from "./Register.module.css"
import { Link } from "react-router-dom"
import time from "../assets/time.svg"
import queue from "../assets/queue.svg"
import grow from "../assets/grow.svg"

function Register(){
    return(
        <div className={styles.registerPage}>  
            <header className={styles.header}>
                <Logo/>
                <div className={styles.login}>Already have an account? <Link to="/login">Login</Link></div>
            </header>
            <main className={styles.main}>
                <section className={styles.left}>
                    <div className={styles.badge}>JOIN THOUSANDS OF DOCTORS</div>
                    <div className={styles.title}>
                        <h2>Create Your Doctor Account</h2>
                        <p>Get your clinic online and start managing your patient queue with DocQueue</p>
                    </div>
                    <div className={styles.benefits}>
                        <ul>
                            <li>
                                <img src={queue} alt="" />
                                <div className={styles.benefit}>
                                    <h5>Manage Patients Easily</h5>
                                    <p>Handle your queue in real time</p>
                                </div>
                            </li>
                            <li>
                                <img src={time} alt="" />
                                <div className={styles.benefit}>
                                    <h5>Save Time</h5>
                                    <p>Reduce crowding and waiting time.</p>
                                </div>
                            </li>
                            <li>
                                <img src={grow} alt="" />
                                <div className={styles.benefit}>
                                    <h5>Grow Your Practice</h5>
                                    <p>Focus more on patients, less on hassle.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className={styles.right}>
                    <div className={styles.title}>
                        <h3>Create Account</h3>
                        <p>Fill in the details below to get started.</p>
                    </div>
                    
                    <form className={styles.form}>
                        <label htmlFor="fullname">Full Name</label>
                        <input id="fullname" type="text" name="fullname"/>
                        <label htmlFor="specialization">Specialization</label>
                        <input id="specialization" type="text" name="specialization"/>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" />
                        <button type="submit">
                            Create Account
                        </button>
                    </form>
                </section>
            </main>
        </div>
    )
}
export default Register