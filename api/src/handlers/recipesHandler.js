const { searchRecipeByName, getAllRecipes, getRecipeById} = require ("../controllers/controllerRecipe")


const getRecipesHandler = async (req, res) =>{
  try {
    const {name} = req.query;
  
      const results = name ? await searchRecipeByName(name) : await getAllRecipes();
      res.status(200).json(results);
    
  } catch (error) {
    res.status(400).json({error: error.message})
  } 
}

//==========================================================================================================

  const getRecipesByIdHandler =  async(req,res)=>{
    try {
          const  { id } = req.params
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