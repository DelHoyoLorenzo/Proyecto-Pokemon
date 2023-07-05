const axios = require("axios");
const { Type } = require('../../db')

async function getTypes(req, res) {
  try {
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
    res.status(200).json(response);

  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = getTypes;
