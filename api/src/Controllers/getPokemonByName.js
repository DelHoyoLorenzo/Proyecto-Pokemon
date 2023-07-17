const axios = require("axios");
const { Pokemon, Type } = require("../db");

async function getPokemonByName(name){
    let pokemon = await Pokemon.findOne({
        where: { name: name },
        include: {
          model: Type,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
  
      if (pokemon) {
        return(pokemon);
      }
  
      let { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
  
      if(!data)  throw new Error('The pokemon that you are looking was not found')
  
      if(data){
        let { id, height, weight, stats, sprites, types } = data;
      //extraigo la informacion del pokemon que necesito
  
      const [hp, attack, defense, specialAttack, specialDefense, speed] =
        stats.map((stat) => {
          return stat.base_stat;
        });
      
        types = types.map((type) =>{return {name: type.type.name}});
  
      return{
        id,
        name,
        height,
        weight,
        hp,
        attack,
        defense,
        speed,
        image: sprites.other.home.front_default,
        types,
      };
      }
    }

module.exports = getPokemonByName;