const { getContactById } = require("../../helpers/contactsAPI");

const findContactById = async (req, res, next) => {
  const { _id } = req.user;
  const contactToFind = await getContactById(req.params.contactId, _id);

  if (!contactToFind) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }

  res.status(200).json(contactToFind);
};

module.exports = findContactById;
