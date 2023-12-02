const { HttpError } = require("../../helpers");
// const { User } = require("../../scheme/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma");
const { SECRET } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email: email } });
  console.log(user);
  // if (!user && !user.verify) {
  //   throw HttpError(401, "Email or password is wrong");
  // }
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user.id };

  const token = jwt.sign(payload, SECRET, { expiresIn: "30d" });

  await prisma.user.update({ where: { id: user.id }, data: {  token } });

  res.status(201).json({
    token,
    user: { name: user.name, email: user.email },
  });
};

module.exports = login;
