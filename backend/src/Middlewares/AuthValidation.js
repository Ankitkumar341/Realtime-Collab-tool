const joi = require('joi');

signupValidation = (req, res, next )=> {
   const schema = joi.object({
     name : joi.string().min(3).max(100).required(),
     email: joi.string().required().email(),
     password: joi.string().min(4).max(100).required(),
   });
   const {error} =  schema.validate(req.body);
        if (error){
            return res.status(400)
            .json({messege :"Bad request",error})
        }
        next ();
}
loginValidation = (req, res, next )=> {
    const schema = joi.object({
      email: joi.string().required().email(),
      password: joi.string().min(4).max(100).required(),
    })
         const {error} =  schema.validate(req.body);
         if (error){
             return res.status(400)
             .json({messege :"Bad request",error});
         }
         next ();
 }

 module.exports = {
    signupValidation,
    loginValidation

 }