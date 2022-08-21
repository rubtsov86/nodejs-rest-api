const express = require("express");

const {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  updateContactById,
  updateFavoriteById,
} = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validationBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(getContacts));

router.get("/:contactId", isValidId, ctrlWrapper(findContactById));

router.post("/", validationBody(schemas.addSchema), ctrlWrapper(addNewContact));

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(updateFavoriteById)
);

router.put("/:contactId", isValidId, ctrlWrapper(updateContactById));

module.exports = router;
