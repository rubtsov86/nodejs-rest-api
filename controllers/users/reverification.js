const { User } = require("../../models/user");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const resendVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verificationToken = uuidv4();

  const mail = {
    to: email,
    subject: "подтверждение email",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>подтвердить email</a>`,
  };

  await sendEmail(mail);

  res.json({ message: "Verification email sent" });
};

module.exports = resendVerification;
