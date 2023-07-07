const axios = require("axios");
const { Pokemon, Type } = require("../db");

async function getAllTypes(){
    let { data } = await axios("https://pokeapi.co/api/v2/type");

    let types = data.results.map((obj)=>{
        return {name: obj.name}
    });
    // types es un arreglo con todos los tipos de pokemons, solo con el name, le saque la url
    if (types.length > 0) {
      await Type.bulkCreate(types);
    }

    // Obtener los tipos de la base de datos
    let response = await Type.findAll();
    //arreglo con todos los tipos
    return response;
}

module.exports = getAllTypes;