// const { HttpError, sendMail, mailMurkup } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { HttpError } = require("../../helpers");

const register = async (req, res, next) => {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();
  await User.create({
    name,
    email,
    password: hashPass,
    verificationToken,
  });

  // await sendMail({
  //   to: email,
  //   subject: "Verify email",
  //   html: mailMurkup(verificationToken),
  // });
  res.status(201).json({ user: { name, email } });
};

module.exports = register;
