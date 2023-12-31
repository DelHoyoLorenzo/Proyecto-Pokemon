const axios = require("axios");
const { Type } = require("../db");

async function createTypes(){
    let { data } = await axios("https://pokeapi.co/api/v2/type");

    let types = data.results.map((obj)=>{
        return {name: obj.name}
    });
    // types es un arreglo con todos los tipos de pokemons, solo con el name, le saque la url
    if (types.length > 0) {
      await Type.bulkCreate(types);//bulkCreate se utiliza para insertar múltiples registros en la tabla, mapeo en sql
    }
}

module.exports = createTypes;