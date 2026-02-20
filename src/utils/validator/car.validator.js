const Joi = require("joi");

const createCarValidator = Joi.object({
  car_name: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  color: Joi.string().required(),
  distance: Joi.number().required(),
  gearbox: Joi.string().valid("Manual", "Avtomat").required(),
  price: Joi.number().required(),
  category_id: Joi.string().required(),
  description: Joi.string().optional(),

});

module.exports = { createCarValidator };