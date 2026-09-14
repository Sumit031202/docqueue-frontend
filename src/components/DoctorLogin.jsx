import { useNavigate } from "react-router-dom";
import styles from "./DoctorLogin.module.css"
import Logo from "./Logo"
import { useState } from "react"
function DoctorLogin({onClose}){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState({});
    const [loginError,setLoginError]=useState("");
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        const newErrors={};
        const userEmail=email.trim();

        // email validation
        if(!userEmail){
            newErrors.email="Email is required"
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)){
            newErrors.email="Please enter a valid address"
        }

        // password validation
        if(!password){
            newErrors.password="Password is required";
        }

        setErrors(newErrors);
        setLoginError("");

        if(Object.keys(newErrors).length>0){
            return;
        }
        try{
            const response=await fetch(
                "https://api.docqueue.online/api/auth/login",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        email: userEmail,
                        password: password
                    })
                }
            );
            const data=await response.json();
            if(!response.ok){
                console.log(response);
                setLoginError(data || "Invalid email or password")
                return;
            }

            // save JWT returned by backend
            localStorage.setItem("token",data.token);

            onClose();
            console.log(data.doctorId);
            navigate(`/doctor-dashboard/${data.doctorId}`);
            
        }catch(error){
            console.error("Login failed: ",error);
            setLoginError("Unable to connect to server. Please try again.")
        }
    }
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
                <form className={styles.form} onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={email} placeholder="doctor@email.com" onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
export default DoctorLogin