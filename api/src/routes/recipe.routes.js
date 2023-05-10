const { Router } = require('express');
const {getRecipesHandler,getRecipesByIdHandler} = require('../handlers/recipesHandler');
const {postRecipeHandler} = require('../handlers/postRecipesHandler');
const { validate } = require('../middlewares/validate');

const recipeRoutes = Router();

// LISTAR RECETA Y BUSCAR POR NAME
recipeRoutes.get('/', getRecipesHandler)

// BUSCAR POR ID
recipeRoutes.get('/:id', getRecipesByIdHandler)

// AGREGAR RECETA 
recipeRoutes.post('/', validate, postRecipeHandler) 
                                                      
module.exports = recipeRoutes;