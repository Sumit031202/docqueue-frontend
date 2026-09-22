import Logo from "./Logo"
import styles from "./Register.module.css"
import { Link } from "react-router-dom"
import time from "../assets/time.svg"
import queue from "../assets/queue.svg"
import grow from "../assets/grow.svg"
import { useState } from "react"

function Register({onLoginClick}){
    const baseUrl="http://localhost:8080"
    const [fullName,setFullName]=useState("");
    const [specialization,setSpecialization]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [errors,setErrors]=useState({});

    const handleRegister=async(e)=>{
        e.preventDefault();
        const newErrors={};
        const name=fullName.trim();
        const spec=specialization.trim();
        const userEmail=email.trim();
        //  name errors
        if(!name){
            newErrors.fullName="Full name is required"
        }else if(name.length<2){
            newErrors.fullName="Full name must be atleast 2 characters"
        }else if(name.length>50){
            newErrors.fullName="Full name cannot exceed 50 characters"
        }
        // specialization errors
        if(!spec){
            newErrors.specialization="Specialization is required";
        }else if(spec.length<2){
            newErrors.specialization="Specialization must be atleast 2 characters"
        }else if(spec.length>25){
            newErrors.specialization="Specialization cannot exceed 25 characters"
        }
        // email errors
        if(!userEmail){
            newErrors.email="Email is required"
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)){
            newErrors.email = "Please enter a valid email address";
        }
        // password errors
        if(!password){
            newErrors.password="Password is required"
        }else if(password.length<8){
            newErrors.password="Password must be atleast 8 characters"
        }else if(password.length>50){
            newErrors.password="Password must not exceed 50 characters";
        }
        // confirm password
        if(confirmPassword!==password){
            newErrors.confirmPassword="Passwords do not match";
        }
        setErrors(newErrors);

        // dont send request if validation failed
        if(Object.keys(newErrors).length>0){
            return;
        }
        // used it for debugging
        // console.log({
        //     name: fullName,
        //     specialization: specialization,
        //     email: email,
        //     password: password
        // });
        const response=await fetch(`${baseUrl}/api/auth/register`,{
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({
                name: fullName,
                specialization: specialization,
                email: email,
                password: password,
            })
        });
        const data=await response.json();
        if(!response.ok){
            console.log(data);
            return;
        }
        setFullName("");
        setSpecialization("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
    }

    return(
        <div className={styles.registerPage}>  
            <header className={styles.header}>
                <Logo/>
                <div className={styles.login}>Already have an account? <Link onClick={onLoginClick}>Login</Link></div>
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
                    
                    <form className={styles.form} onSubmit={handleRegister}>
                        <label htmlFor="fullname">Full Name</label>
                        <input id="fullname" type="text" name="fullname" onChange={(e)=>setFullName(e.target.value)} value={fullName}/>
                        {errors.fullName && (
                            <p className={styles.inputError}>{errors.fullName}</p>
                        )}
                        <label htmlFor="specialization">Specialization</label>
                        <input id="specialization" type="text" name="specialization" onChange={(e)=>setSpecialization(e.target.value)} value={specialization}/>
                        {errors.specialization && (
                            <p className={styles.inputError}>{errors.specialization}</p>
                        )}
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        {errors.email && (
                            <p className={styles.inputError}>{errors.email}</p>
                        )}
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        {errors.password && (
                            <p className={styles.inputError}>{errors.password}</p>
                        )}
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
                        {errors.confirmPassword && (
                            <p className={styles.inputError}>{errors.confirmPassword}</p>
                        )}
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