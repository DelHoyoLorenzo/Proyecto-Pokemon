import style from "./Landing.module.css";
import { Link } from 'react-router-dom';
import gif from '../../assets/landing.gif'
import { bringPokemons, getTypes } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Landing(){
    const dispatch = useDispatch();

    let clickHandler = function(){
        dispatch(bringPokemons())
        dispatch(getTypes())
    }

    return(
        <div className={style.landingBackground}>
            <img src={gif}/>
            <Link to='/home'>
                <button onClick={clickHandler} className={style.button}>Ingresa a tu pokedex</button>
            </Link>
            
        </div>
    )
}



export default Landing;