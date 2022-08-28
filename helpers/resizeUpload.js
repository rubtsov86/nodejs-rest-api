const Jimp = require("jimp");

const resizeUpload = (path) => {
  return Jimp.read(path).then((image) => {
    image.resize(150, 150).write(path);
  });
};

module.exports = resizeUpload;
