const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY2 } = process.env;
const {Op} = require('sequelize')


const cleanArray = (arr)=>{
  return arr.map(e=>{
      return {
          id:e.id,
          name:e.title,
          image:e.image,
          stepByStep:e.analyzedInstructions[0]?.steps.map((step) => ({
              number: step.number,
              step: step.step,
            })),
          summaryOfTheDish:e.summaryOfTheDish,
          levelOfHealthyEating:e.levelOfHealthyEating,
          diet:e.diets,
          created: false
      }
  })}

//=================================================================================================================

const getAllRecipes = async () => {
  const dbRecipes =  await Recipe.findAll()
  const url = "https://api.spoonacular.com/recipes/complexSearch"
  const apiRecipesRaw = (
      await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true`)).data.results
   const apiRecipes = cleanArray(apiRecipesRaw)
      return [...dbRecipes, ...apiRecipes]
  } // https://api.spoonacular.com/recipes/complexSearch?apiKey=a4646e35136d4383903a52e05624e079&number=100&addRecipeInformation=true
// RECORDAR PONER LA PETICION CON 100 RECETAS!!!!!!!!!!!!!!!!!!!!!

//=================================================================================================================

const searchRecipeByName = async (name) => {
  const dbRecipes = await Recipe.findAll({where: {name: {
    [Op.iLike]: `%${name}%`,
  }}})
  const apiRecipesRaw = (
    await axios.get
    (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true`)).data.results

  const apiRecipes = cleanArray(apiRecipesRaw);
  const filterApi = apiRecipes.filter((rec) => rec.name.includes(name));
  return [...filterApi,...dbRecipes]
}

//=================================================================================================================

const createRecipe = async (name,image,summaryOfTheDish,levelOfHealthyEating,stepByStep, diets)=>
await Recipe.create({name,image,summaryOfTheDish,levelOfHealthyEating,stepByStep,diets })

//=================================================================================================================

const getRecipeById = async (id)=>{
  const source = isNaN(id) ? 'bdd' : 'api';

  if(source === 'api'){
  let recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY2}`)
  return {
    id: recipe.data.id,
    name: recipe.data.title,
    summaryOfTheDish: recipe.data.summary,
    levelOfHealthyEating: recipe.data.healthScore,
    stepByStep: recipe.data.analyzedInstructions[0].steps,
    image: recipe.data.image,
    diets: recipe.data.diets,
  };
  }
  return await Recipe.findByPk(id);
}


module.exports = {createRecipe, getRecipeById, getAllRecipes,searchRecipeByName}