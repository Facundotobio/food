const { Diet } = require("../db");
 require("dotenv").config();
const { API_KEY2} = process.env;
 const axios = require("axios");


const getDiets = async () => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
  );

  const allRecipes = response.data.results; 
  // la llamada a la api nos devuelve las recetas dentro de las propiedades 'data'.'results

  const recipeDiets = allRecipes
    .map((rec) => rec.diets)
    .reduce((a, b) => a.concat(b), []); // consigue todas las dietas de las 100 primeras recetas

  const cleanedDiets = [...new Set(recipeDiets)]; // elimina las dietas repetidas

  if (allRecipes.find((el) => el.vegetarian)) cleanedDiets.push("vegetarian"); 
  //hay una dieta 'vegetariana' que no está en la matriz 'dietas', necesitamos añadirla manualmente

  for (let elem of cleanedDiets) {
    await Diet.findOrCreate({where:{name: elem.toLowerCase()}}); 
  }// utilizar findOrCreate para no obtener un error si las dietas ya están en la base de datos

  let dbDiets = await Diet.findAll()

  dbDiets = dbDiets.map(el => el.name)

  return dbDiets;
}

module.exports = getDiets;