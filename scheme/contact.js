const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().optional().allow(""),
  phone: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const shema = { addShema, updateFavoriteSchema };

module.exports = { shema };
