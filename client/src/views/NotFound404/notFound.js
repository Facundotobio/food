import style from "./NotFound.module.css"

const NotFound = () =>{
    return(
        <div className={style.error}>
            <h1>Error 404</h1>
            <h1>Page not found</h1>
            </div>
    )
}

export default NotFound;