import Logo from "./Logo"
import "./Navbar.css"
function Navbar(){
    return(
        <header className='navbar'>
            <Logo/>
            <nav>
                <ul className='navbar_links'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/find-clinics">Find Clinics</a></li>
                    <li><a href="#">How it Works</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </nav>

            <button className='login-btn'>
                Doctor Login →
            </button>
        </header>
    )
}
export default Navbar