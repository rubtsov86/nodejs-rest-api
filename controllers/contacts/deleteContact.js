const { removeContact } = require("../../helpers/contactsAPI");

const deleteContact = async (req, res, next) => {
  const { _id } = req.user;
  const response = await removeContact(req.params.contactId, _id);

  if (!response) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }
  res
    .status(200)
    .json({ message: `Contact with id ${req.params.contactId} was deleted` });
};

module.exports = deleteContact;
