import { useDispatch, useSelector } from "react-redux";
import useForm from "../../Hooks/useForm"; 
import style from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import {TiBackspace} from 'react-icons/ti'

function Form() {
  let navigate = useNavigate()
  const allTypes = useSelector((state) => state.allTypes);

  const {
    handleSubmit,
    handleInput,
    handleTypeInput,
    isTypeSelected,
    errorsPokemon,
    errorsTypes,
    pokemonCreated,
    typesPokemonCreated,
  } = useForm()

  let backHandler = function(){
    navigate('/home')
  }

return (
  <div className={style.firstContainer}>
  <TiBackspace className={style.icon} onClick={backHandler}>Back</TiBackspace>
  <form className={style.formContainer}>
    <div className={style.inputDiv}>
      <p>* Required fields</p>
      <label>Name*</label>
      <input value={pokemonCreated.name} name="name" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.name}</p>
    </div>
    <div className={style.inputDiv}>
      <label>Image URL*</label>
      <input value={pokemonCreated.image} type='text' name="image" onChange={handleInput} placeholder="default image if empty"/>
      <p className={style.error}>{errorsPokemon?.image}</p>
    </div>
    <div className={style.inputDiv}>
      <label>HP*</label>
      <input value={pokemonCreated.hp} type="text" name="hp" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.hp}</p>
    </div>
    <div className={style.inputDiv}>
      <label>Attack*</label>
      <input value={pokemonCreated.attack} type="text" name="attack" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.attack}</p>
    </div>
    <div className={style.inputDiv}>
      <label>Defense*</label>
      <input value={pokemonCreated.defense} type="text" name="defense" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.defense}</p>
    </div>
    <div className={style.inputDiv}>
      <label>Speed</label>
      <input value={pokemonCreated.speed} type="text" name="speed" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.speed}</p>
    </div>
    <div className={style.inputDiv}>
      <label>Height</label>
      <input value={pokemonCreated.height} type="text" name="height" onChange={handleInput} />
      <p className={style.error}>{errorsPokemon?.height}</p>
    </div>
    <div className={style.inputDiv}>
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
    {(pokemonCreated.name && pokemonCreated.hp && pokemonCreated.attack && pokemonCreated.defense && typesPokemonCreated.length>0 && typesPokemonCreated.length<3 && !Object.keys(errorsPokemon).length && !Object.keys(errorsTypes).length) && (<button className={style.button} onClick={handleSubmit}>Create your Pokemon</button>)}
    
  </form>
  </div>
);
}

export default Form;