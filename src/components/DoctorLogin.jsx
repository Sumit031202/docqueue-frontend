import styles from "./DoctorLogin.module.css"
import Logo from "./Logo"
function DoctorLogin({onClose}){
    return(
        <div className={styles.modalOverlay}>
            <div className={styles.loginPage}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                    ×
                </button>
                <Logo/>
                <div className={styles.title}>
                    <h3>Welcome Back</h3>
                    <p>Login to access your clinic dashboard</p>
                </div>
                <form className={styles.form}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" placeholder="doctor@email.com"/>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" placeholder="Enter your password"/>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
export default DoctorLogin