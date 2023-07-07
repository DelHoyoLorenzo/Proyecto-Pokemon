const getPokemonById = require("../../Controllers/getPokemonById");

async function getById(req, res) {
  try {
    const { idPokemon } = req.params;
    let pokemon = await getPokemonById(idPokemon);
    res.status(200).json(pokemon)
    
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = getById;
