const { addContact } = require("../../helpers/contactsAPI");

const addNewContact = async (req, res, next) => {
  const { _id } = req.user;

  const response = await addContact({ ...req.body, owner: _id });
  res.status(201).json({
    message: `Add contact with id ${response._id}`,
    newContact: response,
  });
};

module.exports = addNewContact;
