const { Contact } = require("../models/contact");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (contactId) => {
  const contactToFind = await Contact.findById(contactId);
  return contactToFind;
};

const removeContact = async (contactId) => {
  const contactToDelete = await Contact.findById(contactId);
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

const updateContact = async (contactId, body) => {
  const contactToUpdate = await Contact.findById(contactId);

  if (!contactToUpdate) {
    return false;
  }

  await Contact.findByIdAndUpdate(contactId, { $set: body });

  return contactToUpdate;
};

const updateStatusContact = async (contactId, body) => {
  const contactToUpdate = await Contact.findById(contactId);

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
