const Joi = require("joi");

const registerValidator = Joi.object({
    firstname: Joi.string().required().trim().messages({
        "string.base": "Fisrtname name must be a stirng",
        "string.empty": "Frstname name must not be empty",
        "any.required": "Firstname name is required"
        
    }),
       lastname: Joi.string().required().trim().messages({
        "string.base": "Lastname name must be a stirng",
        "string.empty": "Lastname name must not be empty",
        "any.required": "Lastname name is required"
        
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    
        
   
});


const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}); 

const profilevertificationValidator = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().max(6).required(),
});

const resendOtpValidator = Joi.object({
    email: Joi.string().email().required(),
});

const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordValidator = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});




module.exports = { registerValidator, loginValidator, profilevertificationValidator, resendOtpValidator, forgotPasswordValidator, resetPasswordValidator };