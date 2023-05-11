import Recipe from '../Recipe/Recipe'
import style from "./RecipesConteiner.module.css"
import {useSelector} from 'react-redux'
import React, { useState , useEffect } from 'react'
import Paginado from '../Paginado/Paginado'
import { useLocation } from 'react-router-dom'
import Loading from '../Loading/loading'

const RecipesConteiner = (props) =>{
const location = useLocation();
const recipes = useSelector(state => state.recipes)

const [pagina,setPagina] = useState(1);
const [porPagina,setPorPagina] = useState(9);
const [isLoading, setIsLoading] = useState(true);

const maximo = Math.ceil(recipes.length / porPagina)

useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2200);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.recipeContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {recipes &&
              recipes
                .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
                .map((recipe) => {
                  return (
                    <Recipe
                      key={recipe.id}
                      id={recipe.id}
                      name={recipe.name}
                      image={recipe.image}
                      diets={recipe.diet}
                    />
                  );
                })}
          </>
        )}
      </div>
      <div>{location.pathname === "/home" && <Paginado pagina={pagina} setPagina={setPagina} maximo={maximo} />}</div>
    </div>
  );}

export default RecipesConteiner;
      