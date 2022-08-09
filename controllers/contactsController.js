const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models");

const getContacts = async (req, res, next) => {
  const contactsList = await listContacts();
  res.status(200).json(contactsList);
};

const findContactById = async (req, res, next) => {
  const [contactToFind] = await getContactById(req.params.contactId);

  if (!contactToFind) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }
  res.status(200).json(contactToFind);
};

const addNewContact = async (req, res, next) => {
  const response = await addContact(req.body);
  res.status(201).json({
    message: `Add contact with name ${req.body.name}`,
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

  if (response) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }
  res
    .status(200)
    .json({ message: `Contact with id ${req.params.contactId} was updated` });
};

module.exports = {
  getContacts,
  findContactById,
  addNewContact,
  deleteContact,
  updateContactById,
};
