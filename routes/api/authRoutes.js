const express = require("express");
const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { joiSchema } = require("../../models/user");

const { validationBody, auth } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validationBody(joiSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validationBody(joiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
