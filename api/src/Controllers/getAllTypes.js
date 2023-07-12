const { Type } = require("../db");

async function getAllTypes(){
    // Obtener los tipos de la base de datos
    let response = await Type.findAll();
    //arreglo con todos los tipos
    return response;
}

module.exports = getAllTypes;