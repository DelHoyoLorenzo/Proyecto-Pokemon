const axios = require("axios");
const { Pokemon, Type } = require("../../db");

async function getPokemons(req, res, next) {
  //no me llega nada por req porque es un get
  //traigo los pokemones de la bdd y los pongo en un arreglo
  try {
    let pokemonsBdd = await Pokemon.findAll({
      include: {
        attributes: ["name"],
        model: Type,
        through: {
          attributes: [],
        },
      },
    });

    let response = await axios("https://pokeapi.co/api/v2/pokemon");
    let data = response.data.results;
    //data es un arreglo de objetos donde cada objeto tiene una prop name y url

    let promises = data.map(async (elemento) => {
      let response = await axios(elemento.url);
      let { id, heigth, weight, stats, sprites, types } = response.data;
      //me trae un objeto con muchas propiedades las cuales extraigo las que necesito
      const [hp, attack, defense, specialAttack, specialDefense, speed] =
        stats.map((stat) => {
          return stat.base_stat;
        });
      types = types.map((type) => type.type.name);

      return {
        name: elemento.name,
        id,
        heigth,
        weight,
        hp,
        attack,
        defense,
        speed,
        image: sprites.other.home.front_default,
        types,
      };
      //retorno por cada pokemon un objeto con lo que necesito
    });

    let pokemons = await Promise.all(promises);
    //promesas resueltas, arreglo de objetos

    return res.status(200).json([...pokemonsBdd, ...pokemons]);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

module.exports = getPokemons;
