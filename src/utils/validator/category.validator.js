const Joi = require("joi"); 

const createCategoryValidator = Joi.object({
    category_name: Joi.string().required().trim().messages({
        "string.base": "Category name must be a stirng",
        "string.empty": "Category name must not be empty",
        "any.required": "Category name is required"
        
    }),
});

module.exports = { createCategoryValidator };