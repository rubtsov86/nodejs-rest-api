const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { auth } = require("../../middlewares");

const { getCurrent } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));

module.exports = router;
