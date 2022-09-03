const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "rubtsov1986@meta.ua" };

  try {
    await sgMail.send(email);
    console.log("Email send succses");
    return true;
  } catch (err) {
    throw error;
  }
};

module.exports = sendEmail;
