import style from "./Landing.module.css";
import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div className={style.landingBackground}>
            <Link to='/home'>
                <button>Ingresa a tu pokedex</button>
            </Link>
            
        </div>
    )
}



export default Landing;