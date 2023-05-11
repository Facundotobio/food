import style from "./SearchBar.module.css"
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { RecipeByName } from "../../redux/actions";


const SearchBar = () =>{
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleInput = (e) => {
        e.preventDefault();
        setName(e.target.value)
      }

    const handleSubmit = (e)=> {
        e.preventDefault();
        dispatch(RecipeByName(name));
        setName('')
      }

    return(
        <div className={style.searchBar}>
            <form>
        <input id="search" type="text" autoComplete="off" className={style.input} placeholder="Search recipe.." onChange={(e)=> handleInput(e)} />
        <button className={style.buttonSubmit} type="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;