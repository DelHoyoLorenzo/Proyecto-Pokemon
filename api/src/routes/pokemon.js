const {Router} = require('express')

const getPokemons = require('../Controllers/Pokemons/getPokemons')
const getById = require('../Controllers/Pokemons/getById');
const getByName = require('../Controllers/Pokemons/getByName');
const postPokemon = require('../Controllers/Pokemons/postPokemon');

const pokemonRouter = Router();

pokemonRouter.get('/', (req,res)=>{
    const {name} = req.query
    if(name) return getByName(req, res)
    return getPokemons(req, res)
});
pokemonRouter.get('', getPokemons);
pokemonRouter.get('/:idPokemon', getById);
pokemonRouter.post('', postPokemon);


module.exports = pokemonRouter;