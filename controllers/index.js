const {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  updateContactById,
  updateFavoriteById,
} = require("./contactsController");

const { signup, login, logout } = require("./authController");

const getCurrent = require("./usersController");

module.exports = {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  updateContactById,
  updateFavoriteById,
  signup,
  login,
  logout,
  getCurrent,
};
