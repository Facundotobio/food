import Recipe from '../Recipe/Recipe'
import style from "./RecipesConteiner.module.css"
import {useSelector} from 'react-redux'
import React, { useState } from 'react'
import Paginado from '../Paginado/Paginado'
import { useLocation } from 'react-router-dom'


const RecipesConteiner = (props) =>{
const location = useLocation();
const recipes = useSelector(state => state.recipes)

const [pagina,setPagina] = useState(1);
const [porPagina,setPorPagina] = useState(9);

const maximo = recipes.length / porPagina

    return(
        <div className={style.container}>
            <div className={style.recipeContainer}>
    {recipes && recipes
            .slice((pagina - 1) * porPagina,
                   (pagina - 1) * porPagina + porPagina)
            .map((recipe) =>{
        return <Recipe
        key={recipe.id}
        id={recipe.id}
        name={recipe.name}
        image={recipe.image}
        diets={recipe.diet}
    />})}
    </div>
    <div>
     {(location.pathname === '/home') && <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo}/>}
     </div>
        </div>
        
)}

export default RecipesConteiner;
      