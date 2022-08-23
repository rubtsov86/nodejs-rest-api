const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../helpers/contactsAPI");

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const contactsList = await listContacts(_id, skip, limit);
  res.status(200).json(contactsList);
};

const findContactById = async (req, res, next) => {
  const contactToFind = await getContactById(req.params.contactId);

  if (!contactToFind) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }

  res.status(200).json(contactToFind);
};

const addNewContact = async (req, res, next) => {
  const { _id } = req.user;

  const response = await addContact({ ...req.body, owner: _id });
  res.status(201).json({
    message: `Add contact with id ${response._id}`,
    newContact: response,
  });
};

const deleteContact = async (req, res, next) => {
  const response = await removeContact(req.params.contactId);

  if (!response) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }
  res
    .status(200)
    .json({ message: `Contact with id ${req.params.contactId} was deleted` });
};

const updateContactById = async (req, res, next) => {
  const response = await updateContact(req.params.contactId, req.body);

  if (!response) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }
  res
    .status(200)
    .json({ message: `Contact with id ${req.params.contactId} was updated` });
};

const updateFavoriteById = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      message: "missing field favorite",
    });
  }

  const response = await updateStatusContact(req.params.contactId, req.body);

  if (!response) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }

  console.log(String(response.favorite));

  if (String(response.favorite) === req.body.favorite) {
    return res.status(400).json({
      message: `Status wasn't changed (this contact has already status favorite:${req.body.favorite}). If wou want to change status - you have ti change your request`,
    });
  }

  res.status(200).json({
    message: `Contact with id ${req.params.contactId} changed status`,
  });
};

module.exports = {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  updateContactById,
  updateFavoriteById,
};
