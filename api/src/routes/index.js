const { Router } = require('express');
const recipeRoutes = require('./recipe.routes');
const dietRoutes = require('./diet.routes')

const router = Router();

router.use('/recipes', recipeRoutes); 
router.use('/diet', dietRoutes);

module.exports = router;