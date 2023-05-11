import React from 'react';
import { useDispatch } from 'react-redux';
import style from './Filtros.module.css';
import { orderByaz, orderByscore, filterBydiet, filtercreated, resetfilters} from '../../redux/actions';

export default function Filtros({ diets, setorder, setscore }) {
  const dispatch = useDispatch();

  /* ordenar por asc - desc */
  function handleOderByname(e) {
    dispatch(orderByaz(e.target.value));
    setorder(e.target.value)}

  /* ordenar por Score */
  function handleOrderScore(e) {
    dispatch(orderByscore(e.target.value));
    setscore(e.target.value)}

    /* ordenar por dieta */
  function handleFilterDiets(e) {
    dispatch(filterBydiet(e.target.value))}

    /* ordenar por recetas creadas / api */
  function handleFilterCreated(e) {
    dispatch(filtercreated(e.target.value))}

    // window.location.reload(true);  
  function handleClick() {
      dispatch(resetfilters())
     }

  return (
    <div className={style.container__filtros}>
      {/* ------------Ordenar de a-z z-a------------ */}
      <select onChange={handleOderByname} name="orderaz" id="orderaz">
        <option value="asc">A-z</option>
        <option value="des">Z-A</option>
      </select>
      {/*-------------All dietas al select------------ */}
      <select onChange={handleFilterDiets} name="diet" id="diet">
        <option value="defauls" disabled>
          seleccione..
        </option>
        <option value="alldiets" defaultValue>
        All diets
        </option>
        {diets?.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      {/* Filtrar por puntaje Score */}
      <select onChange={handleOrderScore} name="score" id="score">
        <option value="asc">Lower</option>
        <option value="des">Higher</option>
      </select>

      {/* filtrar los de la base de datos y de la api */}
      <select name="ifoapidb" onChange={handleFilterCreated}>
        <option value="all" defaultValue>
          Recipes
        </option>
        <option value="api">Api</option>
        <option value="created">Created</option>
      </select>

      <button onClick={handleClick}>Reset Filter</button>
    </div>
  );
}
