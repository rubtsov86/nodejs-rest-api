const getContacts = require("./getContacts");
const findContactById = require("./findContactById");
const addNewContact = require("./addNewContact");
const deleteContact = require("./deleteContact");
const updateContactById = require("./updateContactById");
const updateFavoriteById = require("./updateFavoriteById");

module.exports = {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  updateContactById,
  updateFavoriteById,
};
