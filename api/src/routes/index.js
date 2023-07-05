const { Router } = require('express');
// Importar todos los routers;
const pokemonRouter = require('../routes/pokemon');
const typeRouter = require('../routes/type');

const router = Router();

// Configurar los routers

router.use('/pokemons', pokemonRouter)
router.use('/types', typeRouter)

module.exports = router;
