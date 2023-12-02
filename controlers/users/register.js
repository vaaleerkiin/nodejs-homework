const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { HttpError } = require("../../helpers");
const prisma = require("../../prisma");

const register = async (req, res, next) => {
  const { email, name, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user);
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const verificationToken = uuidv4();

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashPass,
      verificationToken,
    },
  });
  // await sendMail({
  //   to: email,
  //   subject: "Verify email",
  //   html: mailMurkup(verificationToken),
  // });
  res.status(201).json({ user: { name, email } });
};

module.exports = register;
