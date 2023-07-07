const post = require('../../Controllers/post');

async function postPokemon(req,res){
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types} = req.body

        let response = await post(name, image, hp, attack, defense, speed, height, weight, types)
        if(response) return res.status(200).json('Your pokemon was successfully added')

    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = postPokemon;