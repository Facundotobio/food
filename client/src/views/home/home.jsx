import RecipesConteiner from "../../components/RecipesConteiner/RecipesConteiner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from '../../redux/actions'
import SearchBar from "../../components/SearchBar/SearchBar";
import Footer from "../../components/Footer/Footer";
import Filtros from '../../components/Filters/Filtros';

const Home = () =>{
    
const dispatch = useDispatch();

const diets = useSelector(state => state.diets);

const [order, setOrder] = useState(''); //para guardar los ordenamientos
const [score, setScore] = useState('');



useEffect(() =>{
dispatch(getRecipes())
dispatch(getDiets())
// eslint-disable-next-line
}, [dispatch])

    return(
        
        <div>
            {<Filtros diets={diets} setorder={setOrder} setscore={setScore} />}
            <SearchBar/>
        <RecipesConteiner diets={diets}/>
        <Footer></Footer>
        </div>
    )
}

export default Home;