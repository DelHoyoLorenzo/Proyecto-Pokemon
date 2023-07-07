const getAllPokemons = require('../../Controllers/getAllPokemons');

async function getPokemons(req, res) {
  //no me llega nada por req porque es un get
  //traigo los pokemones de la bdd y los pongo en un arreglo
  try {
    let allPokemons = await getAllPokemons();
    return res.status(200).json(allPokemons);
    
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports = getPokemons;
