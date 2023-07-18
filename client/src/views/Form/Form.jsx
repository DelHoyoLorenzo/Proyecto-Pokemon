import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reFillPokemons, bringPokemons, chooseFilters, chooseOrder} from "../../redux/actions";
import {validatePokemon, validateTypes} from "../../utils/validation";
import useForm from "../../Hooks/useForm"; 
import style from "./Form.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Form() {
  let navigate = useNavigate()
  const allTypes = useSelector((state) => state.allTypes);
  const allPokemons = useSelector((state) => state.allPokemons)
  const dispatch = useDispatch()


  const {
    handleSubmit,
    handleInput,
    handleTypeInput,
    isTypeSelected,
    errorsPokemon,
    errorsTypes,
    pokemonCreated,
    typesPokemonCreated,
    created
  } = useForm()

  let backHandler = function(){
    navigate('/home')
  }

  let finishHandler = function(){
    /* navigate('/home') */
    console.log(created)
    // if(created){
    //   dispatch(chooseFilters({
    //     origin:'Select Origin',
    //     typeOne:'Select filter One',
    //     typeTwo:'Select filter two',
    //   }))
    //   dispatch(chooseOrder('Select Order'))
    //   /* dispatch(bringPokemons()) */
    //   dispatch(reFillPokemons())
    //   dispatch(resetFilter())
    //   dispatch(setCurrentPage(1))
    //   let created = false;
    // }
  }
/* console.log(pokemonCreated)
console.log(typesPokemonCreated) */

return (
  <div className={style.firstContainer}>
  <button onClick={backHandler}>Back</button>
  <form className={style.formContainer}>
    <div>
      <label>*Name</label>
      <input value={pokemonCreated.name} name="name" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.name}</p>
    </div>
    <div>
      <label>*Image URL</label>
      <input value={pokemonCreated.image} type='text' name="image" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.image}</p>
    </div>
    <div>
      <label>*HP</label>
      <input value={pokemonCreated.hp} type="text" name="hp" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.hp}</p>
    </div>
    <div>
      <label>*Attack</label>
      <input value={pokemonCreated.attack} type="text" name="attack" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.attack}</p>
    </div>
    <div>
      <label>*Defense</label>
      <input value={pokemonCreated.defense} type="text" name="defense" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.defense}</p>
    </div>
    <div>
      <label>Speed</label>
      <input value={pokemonCreated.speed} type="text" name="speed" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.speed}</p>
    </div>
    <div>
      <label>Height</label>
      <input value={pokemonCreated.height} type="text" name="height" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.height}</p>
    </div>
    <div>
      <label>Weight</label>
      <input value={pokemonCreated.weight} type="text" name="weight" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.weight}</p>
    </div>
    <div className={style.typeContainer}>
      <label>Types</label>
      <div className={style.checkBoxsContainer}>
        {allTypes.map((type) => (
          <div className={style.eachType} key={type.name}>
            <input
              type="checkbox"
              name={type.name}
              onChange={handleTypeInput}
              value={type.name}
        // Verifica si el tipo está seleccionado en el estado typesPokemonCreated
              checked={isTypeSelected(type.name)}
            />
            <label>{type.name}</label>
          </div>
        ))}
      </div>
        <p className={style.error}>{errorsTypes &&errorsTypes.types}</p>
    </div>
    {(pokemonCreated.name && pokemonCreated.hp && pokemonCreated.attack && pokemonCreated.defense && typesPokemonCreated.length>0 && typesPokemonCreated.length<3 && !Object.keys(errorsPokemon).length && !Object.keys(errorsTypes).length) && (<button onClick={()=>{handleSubmit(), finishHandler()}}>Create your Pokemon</button>)}
    
  </form>
  </div>
);
}

export default Form;