const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY, API_KEY2, API_KEY3,API_KEY4, API_KEY5, API_KEY6, API_PI, API_PI2 } = process.env;
const {Op} = require('sequelize')
const {cleanArray, cleanArrayDB}= require('./helpers.js')

//=================================================================================================================

const getAllRecipes = async () => {
  let dbRecipes =  await Recipe.findAll({ include: {
    model: Diet, through: { attributes: [] }}})
    dbRecipes = cleanArrayDB(dbRecipes);
  const apiRecipesRaw = (
  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PI2}&number=9&addRecipeInformation=true`)).data.results
   const apiRecipes = cleanArray(apiRecipesRaw)
      return [...dbRecipes, ...apiRecipes]  } 
  // RECORDAR PONER LA PETICION CON 100 RECETAS!!!!!!!!!!!!!!!!!!!!!

//=================================================================================================================

const searchRecipeByName = async (name) => {
  const dbRecipes = await Recipe.findAll({where: {name: {
    [Op.iLike]: `%${name}%`,
  }}})
  const apiRecipesRaw = (
    await axios.get
    (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PI2}&addRecipeInformation=true`)).data.results

  const apiRecipes = cleanArray(apiRecipesRaw);

   const searchTerm = name.toLowerCase();
  
  const filterApi = apiRecipes.filter((rec) =>  {
    const recName = rec.name.toLowerCase();
    return recName.includes(searchTerm);
  });

  return [...filterApi,...dbRecipes]}

//=================================================================================================================

const createRecipe = async (name,image,summaryOfTheDish,levelOfHealthyEating,stepByStep, createIndb, diets)=>
{ const newRecipe = await Recipe.create({name,image,summaryOfTheDish,levelOfHealthyEating,stepByStep, createIndb})
await newRecipe.addDiets(diets);
return newRecipe;}

//=================================================================================================================

const getRecipeById = async (id)=>{
  const source = isNaN(id) ? 'bdd' : 'api'; // si el id es un string trae de la BDD sino de la api
                          // esta diferenciacion se logra al ponerle a mi modelo de recipe un ID UUID
  if(source === 'api'){
  let recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_PI2}`)
  return {
    id: recipe.data.id,
    name: recipe.data.title,
    summaryOfTheDish: recipe.data.summary,
    levelOfHealthyEating: recipe.data.healthScore,
    stepByStep: recipe.data.analyzedInstructions[0].steps,
    image: recipe.data.image,
    diets: recipe.data.diets,
  };        // estas props se retornan en el DETAIL(busqueda por id)
  }
  let recipeDb = await Recipe.findByPk(id, {
    include: [
      {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return {
    id: recipeDb.id,
    name: recipeDb.name,
    summaryOfTheDish: recipeDb.summaryOfTheDish,
    levelOfHealthyEating: recipeDb.levelOfHealthyEating,
    stepByStep: recipeDb.stepByStep,
    image: recipeDb.image,
    diets: recipeDb.diets.map(diet => diet.name),
  };
}


module.exports = {createRecipe, getRecipeById, getAllRecipes,searchRecipeByName}