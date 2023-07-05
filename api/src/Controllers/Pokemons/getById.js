const axios = require("axios");

async function getById(req, res) {
  try {
    const { idPokemon } = req.params;
    let response = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    const data = response.data;
    
    let { name, heigth, weight, stats, sprites } = data;

    const [hp, attack, defense, specialAttack, specialDefense, speed] = stats.map((stat)=>{ 
      return stat.base_stat
     });

    return res.status(200).json({ idPokemon, name, heigth, weight, hp, attack, defense, speed, image: sprites.other.home.front_default });
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = getById;
