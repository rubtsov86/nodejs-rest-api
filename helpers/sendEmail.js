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

// const nodemailer = require("nodemailer");

// const { META_PASSWORD } = process.env;

// const sendEmail = async (email) => {
//   const nodemailerConfig = {
//     host: "smtp.meta.ua",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "rubtsov1986@meta.ua",
//       pass: META_PASSWORD,
//     },
//   };

//   const transporter = nodemailer.createTransport(nodemailerConfig);
//   try {
//     await transporter.sendMail(email);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// module.exports = sendEmail;
