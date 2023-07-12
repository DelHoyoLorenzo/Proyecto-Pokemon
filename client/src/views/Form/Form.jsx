import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../../redux/actions";
import style from "./Form.module.css";

function Form() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);
  const [pokemon, setPokemon] = useState({
    types: [],
  });
  const [errors, setErrors] = useState({});

  let handleTypeInput = function (event) {
    setPokemon((prevState) => ({
      ...prevState,
      types: [...prevState.types, event.target.name],
    }));
    /* setPokemon({
            ...pokemon,
            types: [...types, event.target.value]
        }); */
  };
  let handleInput = function (event) {
    setPokemon({
      ...pokemon,
      [event.target.name]: event.target.value,
    });
  };
  console.log(pokemon);
  let handleSubmit = function (event) {
    event.preventDefault();
    dispatch(createPokemon(pokemon));
    //tendria que despachar una action la cual postee el pokemon a mi endpoint
  };
  return (
    <form onSubmit={handleSubmit} className={style.formConteiner}>
      <div>
        <label>Name</label>
        <input name="name" onChange={handleInput} />
      </div>
      <div>
        <label>Image</label>
        <input name="image" onChange={handleInput} />
      </div>
      <div>
        <label>hp</label>
        <input type="number" name="hp" onChange={handleInput} />
      </div>
      <div>
        <label>Attack</label>
        <input type="number" name="attack" onChange={handleInput} />
      </div>
      <div>
        <label>Defense</label>
        <input type="number" name="defense" onChange={handleInput} />
      </div>
      <div>
        <label>Speed</label>
        <input type="number" name="speed" onChange={handleInput} />
      </div>
      <div>
        <label>Height</label>
        <input type="number" name="height" onChange={handleInput} />
      </div>
      <div>
        <label>Weight</label>
        <input type="number" name="weight" onChange={handleInput} />
      </div>
      <div>
        <label>Types</label>
        <div>
          {allTypes.map((type) => (
            <div key={type.name}>
              <input
                type="checkbox"
                name={type.name}
                onChange={handleTypeInput}
                checked={pokemon.types.includes(type.name)}
              />
              <label>{type.name}</label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit}>Create your Pokemon</button>
    </form>
  );
}

export default Form;
