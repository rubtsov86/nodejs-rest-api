const express = require("express");

const { ctrlWrapper } = require("../../helpers");

const { auth, validationBody } = require("../../middlewares");

const { updateSubscriptionSchema } = require("../../models/user");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validationBody(updateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
