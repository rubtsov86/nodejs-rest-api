const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.resolve("public/avatars");

const addAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);

  try {
    await fs.rename(tempUpload, resultUpload);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = addAvatar;
