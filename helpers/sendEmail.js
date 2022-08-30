const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const sendEmail = async (email) => {
  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "rubtsov1986@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerConfig);
  try {
    await transporter.sendMail(email);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = sendEmail;
