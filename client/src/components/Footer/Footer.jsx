import style from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai'

export default function Footer() {
  return (
    <div className={style.footer}>     
      <NavLink to={"https://www.linkedin.com/in/facundo-tobio/"} className={style.NavLink}>
        <h5 className={style.red}>My linkedin: </h5>
        <AiFillLinkedin className={style.icon}/>
        </NavLink>  
        <br />
        <NavLink to={"https://github.com/Facundotobio"} className={style.NavLink}>
        <h5 className={style.red}>My GitHub: </h5>
        <AiFillGithub className={style.icon}/>
        </NavLink> 
             
        © May-2023 ~ Individual Project by Facundo Tobio ~
    </div>
  );
}