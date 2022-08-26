const multer = require("multer");
const path = require("path");
const { BadRequest } = require("http-errors");

const tmpDir = path.join(__dirname, "../", "tmp");

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },

  limits: {
    fileSize: 2048,
  },
});

const fileFilter = (req, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    cb(
      new BadRequest(
        "Wrong type of file. Require only images - .jpeg, .jpg, .png, .webp"
      )
    );
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage: multerConfig, fileFilter: fileFilter });

module.exports = upload;
