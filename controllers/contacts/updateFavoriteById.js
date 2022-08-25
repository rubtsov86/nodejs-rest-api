const { updateStatusContact } = require("../../helpers/contactsAPI");

const updateFavoriteById = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      message: "missing field favorite",
    });
  }

  const { _id } = req.user;

  const response = await updateStatusContact(
    req.params.contactId,
    req.body,
    _id
  );

  if (!response) {
    return res.status(404).json({
      message: `Ups, we don't find contact with id ${req.params.contactId}, try something else`,
    });
  }

  if (String(response.favorite) === req.body.favorite) {
    return res.status(400).json({
      message: `Status wasn't changed (this contact has already status favorite:${req.body.favorite}). If wou want to change status - you have ti change your request`,
    });
  }

  res.status(200).json({
    message: `Contact with id ${req.params.contactId} changed status`,
  });
};

module.exports = updateFavoriteById;
