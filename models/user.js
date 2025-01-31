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
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  password: Joi.string().min(5).required(),
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .required(),
  subscription: Joi.string(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const resendValidationSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: false },
    })
    .required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
  updateSubscriptionSchema,
  resendValidationSchema,
};
