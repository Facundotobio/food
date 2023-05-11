import {GET_RECIPES, GET_RECIPE, CLEAN_DETAIL_RECIPE, GET_DIETS, GET_SEARCH_NAME, FILTER_BY_DIET,
    ORDER_BY_NAME, ORDER_BY_SCORE, FILTER_DB_OR_API, SUBMIT_RECIPE, RESET_FILTERS} from './actionsTypes';

const initialState = {
    recipes: [],
    recipeDetailed: {},
    allrecipes: [], //copia de recipes
    diets: [] ,
    resPost: [] , 
     pruebareceta:[]}

const rootReducer = (state = initialState, {type, payload}) =>{
switch (type){
    case GET_RECIPES:
       
    
        return {...state, recipes: payload, allrecipes: payload,
        pruebareceta:payload };

    case GET_RECIPE:
        return {...state, recipeDetailed: payload};
        
    case GET_DIETS:
        return {...state, diets: payload};
            
    case GET_SEARCH_NAME:
        return {...state, recipes: payload}
                
    case CLEAN_DETAIL_RECIPE:
        return {...state, recipeDetailed: payload};
     
    case SUBMIT_RECIPE:
        return {...state, resPost: payload };    
//========================================================================================

    case ORDER_BY_NAME:       
            let sortArray = payload === 'asc'
/*Forma ASC*/   ? state.recipes.sort(function (a, b) {
                        if (a.name > b.name) return 1;
                        if (a.name < b.name) {
                            return -1;
                        } else return 0 })
/*Forma DES*/   : state.recipes.sort(function (a, b) {
                        if (a.name > b.name) return -1;
                        if (a.name < b.name) return 1;
                        else return 0 });        
        return { ...state, allrecipes: sortArray }
//========================================================================================
 

case FILTER_BY_DIET:
  
    const allrecipes = state.allrecipes;
    const filterecipe = allrecipes.filter((elem)=> {
      if (elem.diet) {
        const diets = elem.diet;
        return diets.includes(payload);
      }
      return false; 
    });
    return {
      ...state,
      recipes: payload === "alldiets" ? allrecipes : filterecipe,
    };

//========================================================================================

case ORDER_BY_SCORE:{
let RsortedArr =
payload === "asc"
  ? state.recipes.sort(function (a, b) {
      if (a.levelOfHealthyEating > b.levelOfHealthyEating) {
        return 1;
      }

      if (a.levelOfHealthyEating < b.levelOfHealthyEating) {
        return -1;
      }

      return 0;
    })
  : state.recipes.sort(function (a, b) {
      if (a.levelOfHealthyEating > b.levelOfHealthyEating) {
        return -1;
      }

      if (a.levelOfHealthyEating < b.levelOfHealthyEating) {
        return 1;
      }

      return 0;
    });
return {
...state,
recipes: RsortedArr, // paso al estado el ordenamiento
};}

//========================================================================================

    case FILTER_DB_OR_API: {
            const allcreated = state.allrecipes;
            const createFilter = payload === 'created'
                ? allcreated.filter((el) => el.created === true)
                : (state.allrecipes && allcreated.filter((el) => el.created !== true))   
        return {...state, recipes: payload === 'all' ? state.allrecipes : createFilter }}
                
//========================================================================================

case RESET_FILTERS:
    
      return { ...state,
        recipes: [...state.pruebareceta],
    };

//========================================================================================
                                                        default:
                                                            return {...state};
}}

export default rootReducer;