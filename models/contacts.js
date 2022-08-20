const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contactsList);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);
    const contactToFind = parsedContactsList.filter(
      (contact) => contact.id === contactId
    );

    return contactToFind;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);
    const newContactsList = parsedContactsList.filter(
      (contact) => contact.id !== contactId
    );

    if (parsedContactsList.length === newContactsList.length) {
      return false;
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf8");
    return true;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);
    const newContact = {
      id: new Date().getTime().toString(),
      ...body,
    };
    const newContactList = [...parsedContactsList, newContact];

    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactList, null, 2),
      "utf8"
    );

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await fs.readFile(contactsPath, "utf8");
    const parsedContactsList = JSON.parse(contactsList);
    const contactToUpdate = parsedContactsList.find(
      (contact) => contact.id === contactId
    );
    if (!contactToUpdate) {
      return false;
    }
    const updateContactsList = parsedContactsList.map((contact) =>
      contact.id !== contactId ? contact : { ...contact, ...body }
    );

    await fs.writeFile(
      contactsPath,
      JSON.stringify(updateContactsList, null, 2),
      "utf8"
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
