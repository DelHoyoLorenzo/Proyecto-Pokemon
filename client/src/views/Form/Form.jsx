import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../../redux/actions";
import {validatePokemon, validateTypes} from "../../utils/validation";
import style from "./Form.module.css";
import { Link } from "react-router-dom";

function Form() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);
  const [types, setTypes] = useState([])
  const [pokemon, setPokemon] = useState({
    types: types,
  });
  const [errorsPokemon, setErrorsPokemon] = useState({});

  const [errorsTypes, setErrorsTypes] = useState({});

  let handleTypeInput = function (event) {
    if(types.includes(event.target.name)){
       let newTypes = types.filter((type)=> type !== event.target.name)
       setTypes(newTypes)
       setErrorsTypes(validateTypes(newTypes))
    }else{
       setTypes([...types, event.target.name]);
       setErrorsTypes(validateTypes([...types, event.target.name]))
    }
  };

  let handleInput = function (event) {
    setPokemon({
      ...pokemon,
      [event.target.name]: event.target.value,
    });

    setErrorsPokemon(validatePokemon({
        ...pokemon,
        [event.target.name]: event.target.value,
    }))
  };
  
  /* console.log(Object.keys(errorsPokemon)) */
  console.log(Object.values(errorsTypes))
  console.log(types)
  let handleSubmit = function (event) {
      event.preventDefault();
      setPokemon({
        ...pokemon,
        types: types
      })
      if(!(Object.keys(errorsPokemon).length && Object.keys(errorsTypes).length)){ dispatch(createPokemon(pokemon))};
      //tendria que despachar una action la cual postee el pokemon a mi endpoint
    };

  return (
    <div className={style.firstContainer}>
    <Link to='/home'>
        <button>Back</button>
    </Link>
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div>
        <label>Name</label>
        <input name="name" onChange={handleInput} />
        <p className={style.error}>{errorsPokemon.name}</p>
      </div>
      <div>
        <label>Image</label>
        <input type='text' name="image" onChange={handleInput} />
        <p className={style.error}>{errorsPokemon.image}</p>
      </div>
      <div>
        <label>hp</label>
        <input type="text" name="hp" onChange={handleInput} />
        <p className={style.error}>{errorsPokemon.hp}</p>
      </div>
      <div>
        <label>Attack</label>
        <input type="text" name="attack" onChange={handleInput} />
        <p className={style.error}>{errorsPokemon.attack}</p>
      </div>
      <div>
        <label>Defense</label>
        <input type="text" name="defense" onChange={handleInput} />
        <p className={style.error}>{errorsPokemon.defense}</p>
      </div>
      <div>
        <label>Speed</label>
        <input type="text" name="speed" onChange={handleInput} />
        <p className={style.error}>{errorsPokemon.speed}</p>
      </div>
      <div>
        <label>Height</label>
        <input type="text" name="height" onChange={handleInput} />
        <p className={style.error}>{errorsPokemon.height}</p>
      </div>
      <div>
        <label>Weight</label>
        <input type="text" name="weight" onChange={handleInput} />
        <p className={style.error}>{errorsPokemon.weight}</p>
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
                /* checked={pokemon.types.includes(type.name)} */
              />
              <label>{type.name}</label>
            </div>
          ))}
        </div>
          <p className={style.error}>{errorsTypes.types}</p>
      </div>
      <button onClick={handleSubmit}>Create your Pokemon</button>
    </form>
    </div>
  );
}

export default Form;
