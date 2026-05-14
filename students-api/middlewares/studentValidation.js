const Joi = require("joi");

exports.validateStudent = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(5).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((d) => d.message).join(", ");
    return res.status(400).json({ error: msg });
  }
  next();
};

exports.validateStudentId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID. Must be a positive number" });
  }
  next();
};