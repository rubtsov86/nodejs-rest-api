const Joi = require("joi");

module.exports = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          tlds: { allow: false },
        })
        .required(),
      phone: Joi.number().integer().min(0).required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }
    next();
  },
};
