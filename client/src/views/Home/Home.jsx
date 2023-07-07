import style from './Home.module.css';

import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";
import Pokemon from "../../components/Pokemon/Pokemon";
import { bringPokemons } from '../../redux/actions'

function Home(){
    let dispatch = useDispatch()
    let allPokemons = useSelector((state)=> state.allPokemons)

    useEffect(() => {
        dispatch(bringPokemons())
      }, []);// quiero que cada vez que se monte el home, se dispare la accion de llenado del estado global con todos los pokemones de la bdd
    return(
        <div className={style.pokemonsConteiner}>
            {allPokemons.map((pokemon)=>{
               return <Pokemon key={pokemon.id} pokemon={pokemon} />
            })}
        </div>
            /* tiene que ir una searchBar tambien */
    )
}



export default Home;