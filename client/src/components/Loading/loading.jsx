import React from "react";
import style from './loading.module.css'

function Loading() {
  return (
    <div className={style.gif}>
        <img className={style.loading}
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWFkNTVkM2FlY2YyOTljMGExODNmMThmODBmNjI4NWRjYjdkMjczMyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/7RHWc6f4OBp9Cz0lpe/giphy.gif "
        alt="gif"
      ></img>
      
    </div>
  );
}

export default Loading;