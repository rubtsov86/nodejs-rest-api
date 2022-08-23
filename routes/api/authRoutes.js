const express = require("express");
const { signup, login, logout } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { joiSignupSchema, joiLoginSchema } = require("../../models/user");

const { validationBody, auth } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validationBody(joiSignupSchema), ctrlWrapper(signup));

router.post("/login", validationBody(joiLoginSchema), ctrlWrapper(login));

router.get("/logout", auth, ctrlWrapper(logout));

module.exports = router;
