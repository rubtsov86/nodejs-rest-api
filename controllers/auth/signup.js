const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`user witn email ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);

  const verificationToken = uuidv4();

  const mail = {
    to: email,
    subject: "подтверждение email",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>подтвердить email</a>`,
  };

  await sendEmail(mail);

  await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  res.status(201).json({
    user: {
      email,
      avatarURL,
      subscription: "starter",
      verificationToken,
    },
  });
};

module.exports = signup;
