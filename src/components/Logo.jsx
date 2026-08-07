import logo from '/logo.svg'
import "./Logo.css"
function Logo(){
    return(
        <div className="logo">
            <img src={logo} alt="DocQueue" />
            <h2>DocQueue</h2>
        </div>
    )
}
export default Logo