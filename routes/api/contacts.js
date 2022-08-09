const express = require("express");

const {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  updateContactById,
} = require("../../controllers");

const { contactValidation } = require("../../middlewares");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", findContactById);

router.post("/", contactValidation, addNewContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", contactValidation, updateContactById);

module.exports = router;
