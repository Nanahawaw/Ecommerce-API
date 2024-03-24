const { isValidObjectId } = require('mongoose');

const checkId = async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Invalid Object of: ${(req, params.id)}`);
  } else {
    next();
  }
};

module.exports = checkId;
