import style from './recipe.module.css'
import React from 'react';
import { NavLink } from 'react-router-dom';


const Recipe = ({ id, name, image, diets }) => {

    
    return (
        <div className={style.recipe}>
            <div>
                <NavLink className={style.navlink} to={`/recipes/${id}`}>
                    <h3 className={style.name}>{name}</h3>
                </NavLink>
            </div>
            <div className={style.imagen}>
                <NavLink to={`/recipes/${id}`}>
                <img src={image} alt={name} className={style.image} key={name}/>
                </NavLink>
            </div>

            <div>
                <div className={style.diets}>
                <p>Type of diet: </p>
                </div>
                <div className={style.diet}>             
                {Array.isArray(diets) && diets.length > 0 ?
                diets.map((diet , index) => 
                <p key={index}>~{ diet }</p>)
                :
                <p>No hay dietas disponibles</p> 
                        }               
            </div>
            </div>
        </div>
    )}

export default Recipe;