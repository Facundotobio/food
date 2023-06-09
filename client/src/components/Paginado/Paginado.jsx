import React, { useState } from 'react'
import style from './Paginado.module.css'


export default function Paginado({pagina, setPagina, maximo}) {

   const [input, setInput]= useState(1);

   const nextPage = () =>{
    setInput(parseInt(input) +1);
    setPagina(parseInt(pagina) +1);
    window.scrollTo({ top: 0, behavior: 'smooth'})
  };

   const prevPage = () =>{
    setInput(parseInt(input) -1);
    setPagina(parseInt(pagina) -1);
    window.scrollTo({ top: 0, behavior: 'smooth'})
  };

    const firstPage = () =>{
      setInput(1);
      setPagina(1)
      window.scrollTo({ top: 0, behavior: 'smooth'})
    };

    const lastPage = () =>{
      setInput(maximo);
      setPagina(maximo);
      window.scrollTo({ top: 0, behavior: 'smooth'})
    };

   const maxMin = (e) =>{
    if(
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))){
            setPagina(1);
            setInput(1);
    } else {
            setPagina(parseInt(e.target.value))}};

    const onChange = (e) =>{
        setInput (e.target.value);
        window.scrollTo({ top: 0, behavior: 'smooth'})
    }

  return (
    <div className={style.paginado}>
      <button disabled={pagina===1||pagina<1} onClick={firstPage} className={style.prevPage}>First page</button>
        <button disabled={pagina===1||pagina<1} onClick={prevPage} className={style.prevPage}>BACK</button>
    <input onChange={e=>onChange(e)} onClick={e=>maxMin(e)} name='page' value={input} autoComplete='off' className={style.input} />
    <p className={style.p}> of {Math.ceil(maximo)} </p>
    <button disabled={pagina===Math.ceil(maximo)||pagina>maximo} onClick={nextPage} className={style.nextPage}>NEXT</button>
    <button disabled={pagina===Math.ceil(maximo)||pagina>maximo} onClick={lastPage} className={style.nextPage}>Last Page</button>
    </div>
  )}