const { Contact } = require("../models/contact");

const listContacts = async (ownerId, skip, limit, favorite) => {
  const paramsToFind = favorite
    ? { owner: ownerId, favorite }
    : { owner: ownerId };

  const contacts = await Contact.find(paramsToFind, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  return contacts;
};

const getContactById = async (contactId, ownerId) => {
  const contactToFind = await Contact.findOne({
    owner: ownerId,
    _id: contactId,
  });
  return contactToFind;
};

const removeContact = async (contactId, ownerId) => {
  const contactToDelete = await Contact.findOne({
    owner: ownerId,
    _id: contactId,
  });
  if (!contactToDelete) {
    return false;
  }
  await Contact.findByIdAndRemove(contactId);
  return contactToDelete;
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();
  return contact;
};

const updateContact = async (contactId, body, ownerId) => {
  const contactToUpdate = await Contact.findOne({
    owner: ownerId,
    _id: contactId,
  });

  if (!contactToUpdate) {
    return false;
  }

  await Contact.findByIdAndUpdate(contactId, { $set: body });

  return contactToUpdate;
};

const updateStatusContact = async (contactId, body, ownerId) => {
  const contactToUpdate = await Contact.findOne({
    owner: ownerId,
    _id: contactId,
  });

  if (!contactToUpdate) {
    return false;
  }

  await Contact.findByIdAndUpdate(contactId, { $set: body });

  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
