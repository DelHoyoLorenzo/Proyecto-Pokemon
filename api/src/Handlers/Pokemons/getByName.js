const getPokemonByName = require('../../Controllers/getPokemonByName')

async function getByName(req, res) {
  try {
    const { name } = req.query;

    let response = await getPokemonByName(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = getByName;
