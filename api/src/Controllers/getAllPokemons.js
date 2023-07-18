const axios = require("axios");
const { Pokemon, Type } = require("../db");

async function getAllPokemons(){
    let pokemonsBdd = await Pokemon.findAll({
        include: {
          attributes: ["name"],
          model: Type,
          through: {
            attributes: [],
          },
        },
      });
  
      let response = await axios("https://pokeapi.co/api/v2/pokemon?limit=1200");
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
        types = types.map((type) =>{return {name: type.type.name}});
        
        id= String(id)
        
        return {
          id,
          name: elemento.name,
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
      return [...pokemonsBdd, ...pokemons];
      //ordenar por nombre:
      //let arregloOrdenado = [...pokemonsBdd, ...pokemons]
      //return arregloOrdenado.sort((a,b)=> a.name.localeCompare(b.name)
}

module.exports = getAllPokemons;