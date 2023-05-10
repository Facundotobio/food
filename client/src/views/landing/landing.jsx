import style from './landing.module.css'
import { Link } from "react-router-dom";


const Landing = () =>{
    return(
        <div className={style.landing}>
            <header className={style.inicio}> Welcome to my recipe project!</header>
            <br />
            <p className={style.p}>This project is a S.P.A (Single Page Application) that uses data from the spoonacular API
            and its  <br /> own relational database. It can search for recipes,  view their detail, sort them and create new recipes.
            </p>
            <p className={style.p2}> Technologies used : </p>
             <p className={style.p3}>
                🔹 Frontend: #react #redux #javascript #css
            </p>
            <p className={style.p3}>
                🔹 Backend: #nodejs #express #sequelize #postgresql 
            </p>
            <Link to="/home">
            <button  className={style.buttonLanding}>ENTER</button>
            </Link>
        </div>
    )
}

export default Landing;