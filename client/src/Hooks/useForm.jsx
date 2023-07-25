import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { validatePokemon, validateTypes } from "../utils/validation";
import { createPokemon, setPokemonGlobal, setTypesGlobal } from "../redux/actions";
import image from '../assets/ditto-seeklogo.com.svg'

export default function useForm(){
  const dispatch = useDispatch()
  const pokemonCreated = useSelector((state)=> state.pokemonCreated)
  const typesPokemonCreated = useSelector((state)=> state.typesPokemonCreated)
  const allPokemons = useSelector((state)=> state.allPokemons)

  const [types, setTypes] = useState(typesPokemonCreated);
  const [pokemon, setPokemon] = useState(pokemonCreated);

  useEffect(() => {
   setPokemon(pokemonCreated);
   setTypes(typesPokemonCreated);
 }, [pokemonCreated, typesPokemonCreated]);
  

  const [errorsPokemon, setErrorsPokemon] = useState({});

  const [errorsTypes, setErrorsTypes] = useState({});
  
  let handleInput = function (event) {
      dispatch(setPokemonGlobal({
          ...pokemonCreated,
          [event.target.name]: event.target.value,
       }))

       setPokemon({
         ...pokemon,
         [event.target.name]: event.target.value,
       })
       
       setErrorsPokemon(validatePokemon({
           ...pokemon,
           [event.target.name]: event.target.value,
       }))
  };
 
  let handleTypeInput = function (event) {
    if(types.includes(event.target.name)){
       let newTypes = types.filter((type)=> type !== event.target.name)
       setTypes(newTypes)
       setErrorsTypes(validateTypes(newTypes))
       dispatch(setTypesGlobal(newTypes))
     }else{
       setTypes([...types, event.target.name]);
       setErrorsTypes(validateTypes([...typesPokemonCreated, event.target.name]))
       dispatch(setTypesGlobal([
         ...typesPokemonCreated,
         event.target.name
       ]))
    }
  };


  let handleSubmit = function (event) {
    event.preventDefault()
    if (!(Object.keys(errorsPokemon).length && Object.keys(errorsTypes).length)) {
      let newPokemon = {
        ...pokemon,
        name: pokemon.name.toLowerCase(),
        image: pokemon.image || image,
        types,
        speed: pokemon.speed || 0,
        height: pokemon.height || 0,
        weight: pokemon.weight || 0,
      };
  
      dispatch(createPokemon(newPokemon));
      
      // compara el nombre del nuevo pokemon con los nombres existentes en minusculas
      const existingPokemonNames = allPokemons.map((pokemon) => pokemon.name.toLowerCase());
      const newPokemonName = newPokemon.name.toLowerCase();

      if (!existingPokemonNames.includes(newPokemonName)) {//informo que se creo el pokemon solo si el nombre del nuevo pokemon coincide con alguno de mi arreglo total
        alert('Pokemon created!')
      } 
    }
  };

 const isTypeSelected = (type) => {
   return typesPokemonCreated.includes(type); //retorna true si el nombre del type q le paso está
 }

    return{
        handleSubmit,
        handleInput,
        handleTypeInput,
        isTypeSelected,
        errorsPokemon,
        errorsTypes,
        pokemonCreated,
        typesPokemonCreated,
    }
}