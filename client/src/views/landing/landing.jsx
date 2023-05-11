import style from './landing.module.css'
import { Link } from "react-router-dom";


const Landing = () =>{
    return(
        <div className={style.landing}>
            <header className={style.inicio}> Welcome to my recipe project!</header>
            <br />
            <p className={style.p}>Hello my name is Facundo, I present my individual project, which is based on recipes, it is a S.P.A (Single Page Application) that uses data from the spoonacular API, this app is a useful tool for food and cooking lovers. 
 An important functionality to highlight is that users can create their own recipes and these will be saved in a database, which means that they can see them again at any time they want, that is to say that you can have a personalized archive of your favorite recipes.
 First of all, it displays a large amount of culinary recipes coming from an external API, you will always have an inexhaustible source of inspiration for your kitchen, you will never run out of ideas to prepare your next meal.
 In short, this application is a valuable tool for those people who enjoy good food and the art of cooking. I hope you like it. Thank you for your attention!
            </p>
            <p className={style.p2}> Technologies used : </p>
             <p className={style.p3}>
                 Frontend: #react #redux #javascript #css
            </p>
            <p className={style.p3}>
                 Backend: #nodejs #express #sequelize #postgresql 
            </p>
            <Link to="/home">
            <button  className={style.buttonLanding}>ENTER</button>
            </Link>
        </div>
    )
}

export default Landing;