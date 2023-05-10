const { Recipe, Diet } = require("../db");
const axios = require("axios");
const { API_KEY, API_KEY2, API_KEY3,API_KEY4, API_KEY5 } = process.env;
const {Op} = require('sequelize')

const cleanArrayDB = (arr)=>{
  return arr.map(e=>{
      return {
          id:e.id,
          name:e.name,
          image:e.image,
          stepByStep:e.stepByStep,
          summaryOfTheDish:e.summaryOfTheDish,
          levelOfHealthyEating:e.levelOfHealthyEating,
          diet:e.diets.map(diet => diet.name),
          created: e.createIndb }})}

//=================================================================================================================

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
          levelOfHealthyEating:e.healthScore,
          diet:e.diets,
          created: false }})}

//=================================================================================================================

const getAllRecipes = async () => {
  let dbRecipes =  await Recipe.findAll({ include: {
    model: Diet, through: { attributes: [] }}})
    dbRecipes = cleanArrayDB(dbRecipes);
  const apiRecipesRaw = (
      await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY5}&number=9&addRecipeInformation=true`)).data.results
   const apiRecipes = cleanArray(apiRecipesRaw)
   console.log(apiRecipes);
      return [...dbRecipes, ...apiRecipes]  } 
  // RECORDAR PONER LA PETICION CON 100 RECETAS!!!!!!!!!!!!!!!!!!!!!

//=================================================================================================================

const searchRecipeByName = async (name) => {
  const dbRecipes = await Recipe.findAll({where: {name: {
    [Op.iLike]: `%${name}%`,
  }}})
  const apiRecipesRaw = (
    await axios.get
    (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY5}&addRecipeInformation=true`)).data.results

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
  const source = isNaN(id) ? 'bdd' : 'api';

  if(source === 'api'){
  let recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY5}`)
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