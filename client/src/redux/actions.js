import axios from 'axios';
import { GET_RECIPE, GET_RECIPES, CLEAN_DETAIL_RECIPE, GET_DIETS, GET_SEARCH_NAME,
            FILTER_BY_DIET, ORDER_BY_NAME, ORDER_BY_SCORE, FILTER_DB_OR_API, SUBMIT_RECIPE, RESET_FILTERS } from './actionsTypes';

const URL = "http://localhost:3001";

export const getRecipes = () =>{
    return async function(dispatch){
        try {
            const response = await axios.get(`${URL}/recipes`)
            dispatch({type: GET_RECIPES, payload: response.data})
        } catch (error) {
            alert({error: error.message})}}}

//=================================================================================

export const getRecipeById = (id) =>{
    return async function(dispatch){
        try {
            const response = await axios.get(`${URL}/recipes/${id}`)
            dispatch({type: GET_RECIPE, payload: response.data})         
        } catch (error) {
            alert({error: error.message})}}}

//=================================================================================

export const cleanDetailRecipe = () =>{
    return {type: CLEAN_DETAIL_RECIPE,payload: {} }}

//=================================================================================

export const getDiets = () =>{
    return async function (dispatch){
        try {
            const response = await axios.get(`${URL}/diets`)
           return dispatch({type: GET_DIETS, payload: response.data})          
        } catch (error) {
            alert({error: error.message})}}}

//=================================================================================

export const RecipeByName = (name) =>{
    return async function (dispatch){
        try {
            const response = await axios.get(`${URL}/recipes?name=${name}`)
            dispatch({type: GET_SEARCH_NAME, payload: response.data})    
        } catch (error) {
            alert({error: error.message})}}} 

//=================================================================================        

export const postRecipes = (payload) => {
        return async function (dispatch) {
            try {
                const response = await axios.post(`${URL}/recipes`, payload );
                return dispatch({ type: SUBMIT_RECIPE, payload: response.data });
              } catch (error) {
                 alert({error: error.message})}}}

//=================================================================================

export const filterBydiet = (diet) => {
    return { type: FILTER_BY_DIET, payload: diet}}
          
//=================================================================================

export const orderByaz = (order) => {
        return { type: ORDER_BY_NAME, payload: order}}  
    
//=================================================================================
          
export const orderByscore = (payload) => {
    return { type: ORDER_BY_SCORE, payload: payload}}

//=================================================================================
          
export const filtercreated = (data) => {
    return { type: FILTER_DB_OR_API, payload: data }}

//=================================================================================

export const resetfilters = () => {
    return { type: RESET_FILTERS }}
