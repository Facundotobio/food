const { searchRecipeByName, getAllRecipes, getRecipeById} = require ("../controllers/controllerRecipe")


const getRecipesHandler = async (req, res) =>{
    const {name} = req.query;

    const results = name ? await searchRecipeByName(name) : await getAllRecipes();
    res.status(200).json(results);
}

//==========================================================================================================

  const getRecipesByIdHandler =  async(req,res)=>{
    const  { id } = req.params
        try {
        let recipe =  await getRecipeById(id)
        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
  }

  module.exports = {
    getRecipesByIdHandler,
    getRecipesHandler,
  }