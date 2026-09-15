import Logo from "./Logo"
import "./Navbar.css"
import { useNavigate } from "react-router-dom";
function Navbar({onLoginClick,offLoginClick}){
    const navigate=useNavigate();

    const handleDoctorLogin=()=>{
        try{
            const id=localStorage.getItem("doctorId");
            const token=localStorage.getItem("token");
            if(token && id){
                const parts=token.split(".");
                const payload=JSON.parse(atob(parts[1]));
                // console.log(id);
                // console.log(payload);
                // console.log(payload.exp);
                const currTime=Date.now()/1000; // in seconds
                if(payload.exp>currTime){
                    offLoginClick();
                    navigate(`/doctor-dashboard/${id}`)
                }else{
                    throw Error("Expired token found, login again");
                }
            }else{
                onLoginClick();
            }
        }catch(error){
            console.error(error);
            localStorage.removeItem("token");
            localStorage.removeItem("doctorId");
            onLoginClick();
        }
    }
    

    return(
        <header className='navbar'>
            <Logo/>
            <nav>
                <ul className='navbar_links'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/find-clinics">Find Clinics</a></li>
                    <li><a href="#how-it-works">How it Works</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </nav>

            <button onClick={handleDoctorLogin} className='login-btn'>
                Doctor Login →
            </button>
        </header>
    )
}
export default Navbar