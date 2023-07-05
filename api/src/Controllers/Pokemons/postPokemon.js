const { Pokemon, Type } = require('../../db');

async function postPokemon(req,res){
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types} = req.body
        //types es un arreglo con los tipos que el usuario quiere que sea
        if( name && image && hp && attack && defense && speed && height && weight ){
            const [pokemon, created] = await Pokemon.findOrCreate({where: {name: name}, defaults:{name, image, hp, attack, defense, speed, height, weight}})
            //recibo desde el front un pokemon a crear en mi BDD, busco si hay un pokemon con ese id que me pasaron y si no existe lo creo con todos los campos que me pasaron

            let typesBdd = await Type.findAll({ where: { name: types } });
            typesBdd = typesBdd.map((type) => type.type.name);
            //ahora tengo que relacionarlo con mis types:
            await pokemon.setTypes(typesBdd); //seteo la tabla intermedia, existe la relacion
            

            return res.status(200).json('Your pokemon was successfully added')
        }
        throw new Error('Must complete all fields')


    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = postPokemon;