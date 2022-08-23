const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 5,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSignupSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .required(),
  subscription: Joi.string(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .required(),
  subscription: Joi.string(),
});

const User = model("user", userSchema);

module.exports = { User, joiSignupSchema, joiLoginSchema };
