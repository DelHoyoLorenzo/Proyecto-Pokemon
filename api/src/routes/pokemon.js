const {Router} = require('express')

const getPokemons = require('../Handlers/Pokemons/pokemons')
const getById = require('../Handlers/Pokemons/getById');
const getByName = require('../Handlers/Pokemons/getByName');
const postPokemon = require('../Handlers/Pokemons/postPokemon');

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