const getAllTypes = require('../../Controllers/getAllTypes')

async function getTypes(req, res) {
  try {
    let response = await getAllTypes();
    if (response) res.status(200).json(response);

  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = getTypes;
