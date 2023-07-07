const {Router} = require('express')
const getTypes = require('../Handlers/Typess/getTypes')

const typeRouter = Router();

typeRouter.get('', getTypes)

module.exports = typeRouter;