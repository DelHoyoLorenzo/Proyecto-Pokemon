import style from "./Landing.module.css";
import { Link } from 'react-router-dom';
import gif from '../../assets/landing.gif'
import { bringPokemons, getTypes } from "../../redux/actions";
import { useDispatch } from "react-redux";
/* import  from ''; */
function Landing() {
  const dispatch = useDispatch();

  let clickHandler = function () {
    dispatch(bringPokemons());
    dispatch(getTypes());
  }

  return (
    <div className={`${style.landingBackground} sm:flex sm:items-center sm:justify-center h-screen sm:w-auto`}>
        {/* <img src={}/> */}
      <img className="w-1/2 sm:w-auto" src={gif} alt="Pokemon Gif" />
      <Link to='/home'>
        <button onClick={clickHandler} className={`mr-2 ${style.button} p-7 mt-4 md:mt-0 sm:mr-2 sm:w-auto`}>Your Pokedex</button>
      </Link>
    </div>
  )
}

export default Landing;
