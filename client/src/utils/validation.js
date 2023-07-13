export function validateTypes(types) {
  let errorsTypes = {};
  //----------------------------types-----------------------------------

  /*  if (types.length === 0) {
    errorsTypes.types = "Must select one or two types";
  }

  if (types.length > 2) {
    errorsTypes.types = "Must select either one or two types";
  }

  if (types.length === 2 && types[0] === types[1]) {
    errorsTypes.types = "Must select different types for the pokemon";
  } */
  if (types.length === 0) {
    errorsTypes.types = "Must select one or two types";
  } else if (types.length > 2) {
    errorsTypes.types = "Must select either one or two types";
  } else {
    errorsTypes.types = "";
  }
  return errorsTypes;
}

export function validatePokemon(pokemon) {
  let errorsPokemon = {};

  function onlyLetters(input) {
    //verifica si el string solo contiene letras, sea mayusculas o minusculas
    const regex = /^[a-zA-Z]+$/;
    return regex.test(input);
  }
  const { name, image, hp, attack, defense, speed, weight, height } = pokemon;
  //-----------------------name---------------------------------------
  if (!name) {
    errorsPokemon.name = "The pokemon must have a name";
  } else if (!onlyLetters(name)) {
    errorsPokemon.name = "Name must contain only letters";
  }
  //-----------------------------image---------------------------------
  if (!image) {
    errorsPokemon.image = "Must contain an url image";
  } else if (!typeof image === "string") {
    errorsPokemon.image = "No numbers allowed";
  }
  //---------------------------hp---------------------------------------
  /* if (!hp) {
  errorsPokemon.hp = "The pokemon must have hp";
}

if (isNaN(hp)) {
  errorsPokemon.hp = "The hp of the pokemon has to be a number";
}

if (!Number.isInteger(Number(hp))) {
  errorsPokemon.hp = "The hp of the pokemon has to be an integer";
}

if (!(hp >= 1 && hp <= 100)) {
  errorsPokemon.hp = "The hp of the pokemon has to be between 1 and 100";
} */
  if (!hp) {
    errorsPokemon.hp = "The pokemon must have hp";
  } else if (isNaN(hp)) {
    errorsPokemon.hp = "The hp of the pokemon has to be a number";
  } else if (!Number.isInteger(Number(hp))) {
    errorsPokemon.hp = "The hp of the pokemon has to be an integer";
  } else if (!(Number(hp) >= 1 && Number(hp) <= 100)) {
    errorsPokemon.hp = "The hp of the pokemon has to be between 1 and 100";
  }
  /* errorsPokemon.hp = ""; */
  //---------------------------attack-----------------------------------
  if (!attack) {
    errorsPokemon.attack = "The pokemon must have attack power";
  } else if (!Number.isInteger(attack)) {
    //verifico que sea integer y ademas numero
    errorsPokemon.attack = "The attack of the pokemon has to be an integer";
  } else if (!(attack >= 0 && attack <= 900)) {
    errorsPokemon.attack =
      "The attack of the pokemon has to be between 1 and 900";
  }
  //--------------------------defense----------------------------------------
  if (!defense) {
    errorsPokemon.defense = "The pokemon must have defense power";
  } else if (!Number.isInteger(defense)) {
    //verifico que sea integer y ademas numero
    errorsPokemon.defense = "The defense of the pokemon has to be an integer";
  } else if (!(defense >= 0 && defense <= 900)) {
    errorsPokemon.defense =
      "The defense of the pokemon has to be between 1 and 900";
  }

  //---------------------------------speed------------------------------------
  if (speed) {
    if (!Number.isInteger(speed)) {
      //verifico que sea integer y ademas numero
      errorsPokemon.speed = "The speed of the pokemon has to be an integer";
    } else if (!(speed >= 0 && speed <= 900)) {
      errorsPokemon.speed =
        "The speed of the pokemon has to be between 0 and 900";
    }
  }

  //--------------------------------height------------------------------------
  if (height) {
    if (!Number.isInteger(height)) {
      //verifico que sea integer y ademas numero
      errorsPokemon.height = "The height of the pokemon has to be an integer";
    } else if (!(height >= 0 && height <= 900)) {
      errorsPokemon.height =
        "The height of the pokemon has to be between 0 and 900";
    }
  }

  //--------------------------------weight------------------------------------
  if (weight) {
    if (!Number.isInteger(weight)) {
      //verifico que sea integer y ademas numero
      errorsPokemon.weight = "The weight of the pokemon has to be an integer";
    } else if (!(weight >= 0 && weight <= 900)) {
      errorsPokemon.weight =
        "The weight of the pokemon has to be between 0 and 900";
    }
  }

  return errorsPokemon;
}
