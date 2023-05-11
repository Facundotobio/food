import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, postRecipes} from '../../redux/actions';
import style from "./form.module.css";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Form = () =>{

    const dispatch= useDispatch();
    const URL = "http://localhost:3001";
    const diets = useSelector((state) => state.diets);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDiets())
        }, [dispatch])    

    const [form, setForm] = useState({
        name: "",
        image: "",
        summaryOfTheDish: "",
        levelOfHealthyEating: "50",
        stepByStep: [],
        diets: [] })
        
    const [errors, setErrors] = useState({
        name: "",
        image: "",
        summaryOfTheDish: "",
        levelOfHealthyEating: "",
        stepByStep: "",
        diets: "" })

    const validate = (form) => {
            let newErrors = {};
            //name verification
            if (!form.name.trim()) {
              newErrors.name = "Name is required";
            } else if ( form.name.length > 0){ errors.name = null; }
            // image validation
            if (!form.image.trim()) {
              newErrors.image = " Image is Required";
            }
            // Summary validation        
            if (!form.summaryOfTheDish.trim()) {
              newErrors.summaryOfTheDish = " Summary is required";
            } 
            if (form.summaryOfTheDish.length < 10 || form.summaryOfTheDish.length > 500) {
              newErrors.summaryOfTheDish ="Summary must be between 10 and 500 characters"
            }
            // Diets validation
            if (!form.diets.length) {
              newErrors.diets = "At least one diet is required";
            }
            setErrors(newErrors) };    

    const clearForm = () => {
        setForm({
        name: "",
        image: "",
        summaryOfTheDish: "",
        levelOfHealthyEating: "50",
        stepByStep: [],
        diets: [] });
    setErrors({
        name: "",
        image: "",
        summaryOfTheDish: "",
        levelOfHealthyEating: "",
        stepByStep: "",
        diets: ""
    })};
    
    const selectDiet = (e) => {
        let value = parseInt(e.target.value)
        if (!form.diets.find(diet => diet.id === value)){
            setForm({...form, diets: [...form.diets, {id:value, name: e.target.selectedOptions[0].text,}]})}
            setErrors(({ ...form, diets: value }));
            value = "" };
                    
    const handleDelete = (id) => {
        setForm({ ...form,
            diets: form.diets.filter((diet) => diet.id !== id) })};
    
    const changeHandler = (event) =>{
        const property = event.target.name // event.target es para saber quien disparo el evento, .name es para diferenciarlos por su name
        const value = event.target.value   
        validate({...form,[property]: value}) // errors, setErrors, property  
        setForm({...form,[property]: value})}  

      
    function submitHandler(e) {
          e.preventDefault();
          form.diets = form.diets.map(diet => diet.id)
          axios.post(`${URL}/recipes`, form )
          .then((response) =>{ alert('Recipe created'); clearForm(); navigate("/home");})
         .catch ((error) => { alert("Error creating the recipe") })}

    return(
        <div className={style.formConteiner}>
        <form autoComplete="off" onSubmit={submitHandler} className={style.form}>
            <div>
                 <h3 className={style.create}>Create new recipe</h3>
            </div>
            
            <div>
                <label className={style.label}>Name : </label>
                <input type="text" value={form.name} name="name" onChange={changeHandler} className={style.input}></input>
                <div>
                <p className={style.errors}> {errors.name}</p>
                </div>
            </div>
            
            <div>
                <label className={style.label}>Image : </label>
                <input type="text" value={form.image} name="image" onChange={changeHandler} className={style.input}></input>
                <div>
                    <br />
                    {/* {errors.image && (
                      <span className={style.errors}>{errors.image}</span>
                    )} */}
                </div>
            </div>
            <div className={style.imageContainer}>
                    {form.image && <img src={form.image} alt="new recipe" />}
                  </div>    
                  <br />
            <div>
                <label className={style.label}>Summary : </label>
                <textarea type="text" value={form.summaryOfTheDish} name="summaryOfTheDish" onChange={changeHandler} className={style.input2}></textarea>
                <div>
                <p className={style.errors}>{errors.summaryOfTheDish}</p>
                </div>
            </div>
            <br />
            <div className={style.containerLevel}>
                <label className={style.label}>Level Of Healthy Eating : </label>
                <input className={style.level} type="range" min="0" max="100" value={form.levelOfHealthyEating} name="levelOfHealthyEating" onChange={changeHandler}></input>               
                <label className={style.labelScore}>{form.levelOfHealthyEating}</label>
            </div>
            <br></br>
            <div>
                <label className={style.labelD}>Step by step : </label>
                <textarea type="text" value={form.stepByStep} name="stepByStep" onChange={changeHandler} className={style.input2}>[]</textarea>
                <div>
                <p className={style.errors}>{errors.stepByStep}</p>
                </div>
            </div>        
        <div>
          <div className={style.dieta}>
            <label className={style.labelD}> Diets : </label>
            <select className={style.select} onChange={selectDiet}> 
                <option value="" hidden> Select diets </option>
                {diets.map((diet) => (
                    <option key={diet.id} value={diet.id}>{diet.name}</option>))}
            </select>
            <br />
            <div>
                <p className={style.errors}>{errors.diets}</p>
                </div>
        </div>
        <div className={style.dieta}>
            {form.diets.map((diet, index) => (
                <div key={index}>
                <br />
                <p className={style.labelD}>{diet.name}</p>
                <button className={style.x} onClick={()=>handleDelete(diet.id)} type="button">x</button>
            </div>
            ))}
            </div>
        </div>
        <br />
        
        <div className={style.button}>
                <button  className={style.Create} type="submit">Create</button>
                </div>
        </form>
        </div>
)}

export default Form;