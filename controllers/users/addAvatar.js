const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.resolve("public", "avatars");

const addAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);

  try {
    await fs.rename(tempUpload, resultUpload);
    const { _id } = req.user;
    const avatar = path.join("avatars", originalname);
    await User.findByIdAndUpdate(_id, { $set: { avatarURL: avatar } });
    res.json({ message: avatar });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = addAvatar;
