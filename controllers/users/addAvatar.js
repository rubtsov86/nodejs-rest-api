const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const addAvatar = async (req, res) => {
  if (req?.errorFileType) {
    return res.status(400).json({
      message: "You can add only images (.png, .jpeg, .jpg or .webp) ",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      message: "You don't add any file",
    });
  }

  const { path: tmpUpload, originalname } = req.file;

  const { _id } = req.user;
  const avatarName = `${_id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, avatarName);
    console.log(resultUpload);
    await fs.rename(tmpUpload, resultUpload);

    const avatarURL = path.join("avatars", avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ message: avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = addAvatar;
