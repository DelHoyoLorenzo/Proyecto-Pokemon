const axios = require("axios");

async function getByName(req, res) {
  try {
    const { name } = req.query;

    let {data} = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //data es un objeto con los atributos que necesito, es el pokemon digamos
    if(!data) throw Error(`The pokemon called ${name} was not found`)

    let { id, heigth, weight, stats, sprites} = data
    //extraigo la informacion del pokemon que necesito

    const [hp, attack, defense, specialAttack, specialDefense, speed] = stats.map((stat)=>{ 
      return stat.base_stat
     });

    return res.status(200).json({ id, name, heigth, weight, hp, attack, defense, speed, image: sprites.other.home.front_default });
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = getByName;