const { listContacts } = require("../../helpers/contactsAPI");

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contactsList = await listContacts(_id, skip, limit, favorite);
  res.status(200).json(contactsList);
};

module.exports = getContacts;
