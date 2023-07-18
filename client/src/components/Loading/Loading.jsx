import gif from '../../assets/load-loading.gif'
import style from './Loading.module.css'

function Loading(){
    return(
        <div>
            <img className={style.gif}/>
        </div>
    )
}

export default Loading;