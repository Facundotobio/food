import { Link } from "react-router-dom"
import style from "./NavBar.module.css"


const NavBar = () =>{
    return(
        <div className={style.mainContainer}>
<Link className={style.homeForm} to="/home">HOME</Link>
<Link className={style.homeForm} to="/create">CREATE</Link>
        </div>
    )
}

export default NavBar;