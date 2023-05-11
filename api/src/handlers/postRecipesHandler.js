const {createRecipe } = require('../controllers/controllerRecipe')

const postRecipeHandler = async (req,res)=>{
    try {
        const {name,image,summaryOfTheDish,levelOfHealthyEating,stepByStep, createIndb ,diets} = req.body
        const newRecipe = await createRecipe(name,image,summaryOfTheDish,levelOfHealthyEating,stepByStep,createIndb ,diets)
        await newRecipe.addDiet(diets)
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(400).json({error:error.message})
    }}

module.exports = {postRecipeHandler}