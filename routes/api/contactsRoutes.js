const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, isValidId, auth } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.findContactById));

router.post(
  "/",
  auth,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.addNewContact)
);

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.deleteContact));

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.put("/:contactId", auth, isValidId, ctrlWrapper(ctrl.updateContactById));

module.exports = router;
