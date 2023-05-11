const { Diet } = require("../db");
 require("dotenv").config();
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_PI, API_PI2 } = process.env;
 const axios = require("axios");

const getDiets = async () => { 

    const response = await axios.get(
  `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PI}&addRecipeInformation=true&number=100`);
  
    const allRecipes = response.data.results; 
    // la llamada a la api nos devuelve las recetas dentro de las propiedades 'data'.'results
    const recipeDiets = allRecipes.map((rec) => rec.diets).reduce((a, b) => a.concat(b), []);
     // consigue todas las dietas de las 100 primeras recetas
    const cleanedDiets = [...new Set(recipeDiets)]; // elimina las dietas repetidas
    if (allRecipes.find((el) => el.vegetarian)) cleanedDiets.push("vegetarian"); 
    // la dieta 'vegetariana' no está en la matriz 'dietas', necesitamos añadirla manualmente
    for (let elem of cleanedDiets) {await Diet.findOrCreate({where:{name: elem.toLowerCase()}})} 
    // findOrCreate para no obtener un error si las dietas ya están en la base de datos
    let dbDiets = await Diet.findAll()
   
    return dbDiets; }

module.exports = getDiets;