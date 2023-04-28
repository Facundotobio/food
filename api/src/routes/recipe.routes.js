const { Router } = require('express');
const {getRecipesHandler,getRecipesByIdHandler} = require('../handlers/recipesHandler');
const {createRecipeHandler} = require('../handlers/postRecipesHandler');

const recipeRoutes = Router();

// LISTAR RECETA Y BUSCAR POR NAME
recipeRoutes.get('/', getRecipesHandler)

// BUSCAR POR ID
recipeRoutes.get('/:id', getRecipesByIdHandler)

// AGREGAR RECETA 
recipeRoutes.post('/', createRecipeHandler) 
                                                      

module.exports = recipeRoutes;