const { Pokemon, Type } = require('../db');
const { Op } = require("sequelize");

async function post(name, image, hp, attack, defense, speed, height, weight, types){
        //types es un arreglo con los tipos que el usuario quiere que sea
        if( name && image && hp && attack && defense && speed && height && weight ){
            const [pokemon, created] = await Pokemon.findOrCreate({where: {name: name}, defaults:{name: name, image: image, hp: hp, attack: attack, defense: defense, speed: speed, height: height, weight: weight}})
            //recibo desde el front un pokemon a crear en mi BDD, busco si hay un pokemon con ese id que me pasaron y si no existe lo creo con todos los campos que me pasaron
            if(!created) throw new Error('The pokemon already exists')

            let typesBdd = await Type.findAll({ //typesBdd es un arreglo de obj, donde cada obj tiene un uuid y tmb un name del tipo
                where: {
                  name: {
                    [Op.in]: types,
                  },
                },
              });
            //Op.in para especificar que la condición de búsqueda debe coincidir con cualquier nombre de tipo que esté incluido en el arreglo types. Esto buscará los tipos en la base de datos cuyos nombres estén presentes en el arreglo types.

            //ahora tengo que relacionarlo con mis types:
            await pokemon.setTypes(typesBdd); //seteo la tabla intermedia, existe la relacion
            
            let response = await Pokemon.findOne({where:{name: name},
                include: {
                  attributes: ["name"],
                  model: Type,
                  through: {
                    attributes: [],
                  },
                },
              });
            
            return(response)
        }
        throw new Error('Must complete all fields')
}

module.exports = post;