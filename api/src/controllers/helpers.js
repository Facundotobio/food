
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

module.exports = {cleanArray, cleanArrayDB}