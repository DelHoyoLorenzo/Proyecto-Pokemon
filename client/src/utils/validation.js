export function validateTypes(types) {
  let errorsTypes = {};
  //----------------------------types-----------------------------------
 /*  errorsTypes.types = "Must select one or two types" */
  if (types.length === 0) {
    errorsTypes.types = "Must select one or two types";
  } else if (types.length > 2) {
    errorsTypes.types = "Must select either one or two types";
  }
    return errorsTypes;
}

export function validatePokemon(pokemon) {
  let errorsPokemon = {};

  function onlyLetters(input) {
    // verifica si el string solo contiene letras, mayúsculas o minúsculas, y espacios
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(input);
  }

  const { name, image, hp, attack, defense, speed, weight, height } = pokemon;
  //-----------------------name---------------------------------------
  if (!name) {
    errorsPokemon.name = "The pokemon must have a name";
  } else if (!onlyLetters(name)) {
    errorsPokemon.name = "Name must contain only letters";
  }else if (name.length>20){
    errorsPokemon.name = 'Name must have less than 20 letters'
  }
  //-----------------------------image---------------------------------
  /* if (!image) {
    errorsPokemon.image = "Must contain an url image";
  } */
  //---------------------------hp---------------------------------------
  if (!hp) {
    errorsPokemon.hp = "The pokemon must have hp";
  } else if (isNaN(hp)) {
    errorsPokemon.hp = "The hp of the pokemon has to be a number";
  } else if (!(hp >= 1 && hp <= 100)) {
    errorsPokemon.hp = "The hp of the pokemon has to be between 1 and 100";
  }
  //---------------------------attack-----------------------------------
  if (!attack) {
    errorsPokemon.attack = "The pokemon must have attack power";
  } else if (isNaN(attack)) {
    errorsPokemon.attack = "The attack of the pokemon has to be a number";
  } else if (!(attack >= 0 && attack <= 900)) {
    errorsPokemon.attack =
      "The attack of the pokemon has to be between 1 and 900";
  }
  //--------------------------defense----------------------------------------
  if (!defense) {
    errorsPokemon.defense = "The pokemon must have defense power";
  } else if (isNaN(defense)) {
    errorsPokemon.defense = "The defense of the pokemon has to be a number";
  } else if (!(defense >= 0 && defense <= 900)) {
    errorsPokemon.defense =
      "The defense of the pokemon has to be between 1 and 900";
  }

  //---------------------------------speed------------------------------------
  if (speed) {
    if (isNaN(speed)) {
      errorsPokemon.speed = "The speed of the pokemon has to be a number";
    } else if (!(speed >= 0 && speed <= 900)) {
      errorsPokemon.speed =
        "The speed of the pokemon has to be between 0 and 900";
    }
  }

  //--------------------------------height------------------------------------
  if (height) {
    if (isNaN(height)) {
      //verifico que sea integer y ademas numero
      errorsPokemon.height = "The height of the pokemon has to be a number";
    } else if (!(height >= 0 && height <= 900)) {
      errorsPokemon.height =
        "The height of the pokemon has to be between 0 and 900";
    }
  }

  //--------------------------------weight------------------------------------
  if (weight) {
    if (isNaN(weight)) {
      errorsPokemon.weight = "The weight of the pokemon has to be a number";
    } else if (!(weight >= 0 && weight <= 900)) {
      errorsPokemon.weight =
        "The weight of the pokemon has to be between 0 and 900";
    }
  }

  return errorsPokemon;
  }

