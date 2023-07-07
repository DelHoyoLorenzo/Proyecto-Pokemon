const axios = require("axios");
const { Pokemon, Type } = require("../db");

async function getPokemonByName(name){
    //data es un objeto con los atributos que necesito, es el pokemon digamos
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
        let { id, heigth, weight, stats, sprites, types } = data;
      //extraigo la informacion del pokemon que necesito
  
      const [hp, attack, defense, specialAttack, specialDefense, speed] =
        stats.map((stat) => {
          return stat.base_stat;
        });
      
        types = types.map((type) =>{return {name: type.type.name}});
  
      return{
        id,
        name,
        heigth,
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