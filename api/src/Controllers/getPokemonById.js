const axios = require("axios");
const { Pokemon, Type } = require("../db");

async function getPokemonById(id){

    if (Number.isInteger(Number(id))) {
      let { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
    
      if(!data) throw new Error('Invalid Id')

      let { name, heigth, weight, stats, sprites, types } = data;
      
      types = types.map((type) =>{return {name: type.type.name}});
      console.log(types)
      const [hp, attack, defense, specialAttack, specialDefense, speed] =
        stats.map((stat) => {
          return stat.base_stat;
        });

      return {
          id,
          name,
          heigth,
          weight,
          hp,
          attack,
          defense,
          speed,
          image: sprites.other.home.front_default,
          types
        };
    }

    function isUUID(value) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    }
    
    if(!isUUID(id)) throw new Error('Invalid Id')
    //si el id que me pasan es un uuid, lo busco en mi base de datos
      let pokemon = await Pokemon.findOne({
        where: { id: id },
        include: {
          model: Type,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      return {
            id: id,
          name: pokemon.name,
          height: pokemon.heigth,
          weight: pokemon.weight,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          speed: pokemon.speed,
          image: pokemon.image,
          types: pokemon.types
        };
    }

module.exports = getPokemonById;