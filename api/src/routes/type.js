const {Router} = require('express')
const getTypes = require('../Controllers/Typess/getTypes')

const typeRouter = Router();

typeRouter.get('', getTypes)

module.exports = typeRouter;