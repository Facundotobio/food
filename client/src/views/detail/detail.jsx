import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {getRecipeById, cleanDetailRecipe} from '../../redux/actions'
import style from './detail.module.css'
import Loading from "../../components/Loading/loading";

const Detail = () =>{

  const {id} = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetailed)
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    dispatch(getRecipeById(id));
    return () =>{
        dispatch(cleanDetailRecipe());
    }
  }, [id, dispatch]);

  const changeLoading = () =>{
    setTimeout(() => {
      setLoading(false);
    }, 2200);
  };
  

  if (loading) {
  changeLoading();
  return <Loading></Loading>;
} else {return(
  <div className={style.detailContainer}>
      <NavLink to={"/home"}>
  <button className={style.back}>BACK</button>
  </NavLink>     
  <h1 className={style.Detalle}>DETAIL OF THE RECIPE: </h1>
  <br />
  <h1 className={style.name}> - {recipe.name}</h1>
  <h2 className={style.id}>Id: {id}</h2>
  <div className={style.image}>
    {recipe.image ? <img src={recipe.image} alt={recipe.name} className={style.img}/> 
    : <img className={style.img} src={"./ImgNotFound.png"} alt="Img Not Found."></img> }
  </div>
  {recipe.diets ?
      <div className={style.diets}>
      <h3 className={style.typeOfDiet}>Types of diets: </h3>
          {
        recipe.diets?.map(d => {
         if (d.hasOwnProperty('name')) {
          return (
          <p key={d.name} >- {d.name[0].toUpperCase() + d.name.slice(1)} </p> )
            } else {
         return (
        <p key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>  )}})}
        </div>
           :
        <h5 className={style.notFound}>This recipe has no diet type.</h5>}
  { recipe.summaryOfTheDish ?
  <div>
    <h3 className={style.resumen}>Summary: </h3>
    <p className={style.resumenText}>{recipe.summaryOfTheDish?.replace(/<[^>]*>/g, '')}</p>
  </div> : 
  <h5 className={style.notFound}>This recipe does not have summary.</h5>  }
  <br />
  {recipe.levelOfHealthyEating ?
    <div>
      <h3 className={style.health}>Health score: </h3>
      <p className={style.healthScore}>{recipe.levelOfHealthyEating}</p>
    </div> :
      <h5 className={style.notFound}>This recipe is not scored.</h5> }
       {recipe.stepByStep ?
                      <div>
                          <h3 className={style.steps}>Steps: </h3>
                          <ul>{Array.isArray(recipe.stepByStep) ? recipe.stepByStep.map(s => {
                              return (
                                  <p className={style.stepsBySteps} key={s.number}>{s.number}: {s.step}</p>
                              )
                          }) :
                              <p className={style.stepsBySteps}>{recipe.stepByStep}</p>
                          } </ul>
                      </div> :
                      <h5 className={style.notFound}>This recipe does not have step by step</h5>
                  }
  </div>
  )
}}

export default Detail; 