

// middleware de validacion para corroborar q los datos no vengan mal
const validate = (req,res,next) =>{
    const {name,summaryOfTheDish,levelOfHealthyEating,stepByStep,image,dietID} = req.body;
    if( !name ) res.status(400).json({error: "Missing name"});
    if( !summaryOfTheDish ) res.status(400).json({error: "Missing summaryOfTheDish"});
    if( !levelOfHealthyEating ) res.status(400).json({error: "Missing levelOfHealthyEating"});
    if( !stepByStep ) res.status(400).json({error: "Missing stepByStep"});
    if( !image ) res.status(400).json({error: "Missing image"});
    // if( !dietID ) res.status(400).json({error: "Missing diet"});
    next();
}

module.exports = {validate}