const { HttpError, sendMail } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { BASE_URL } = process.env;

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

  await sendMail({
    to: email,
    subject: "Verify email",
    html: `
    <a
    style="
    margin-left: auto;
    margin-right: auto;
    text-decoration: none;
    background-color: rgb(58, 58, 214);
    color: white;
    padding: 18px;
    display: grid;
    width: 200px;
    text-align: center;
    border-radius: 5px;
  "
  href="${BASE_URL}/api/users/verify/${verificationToken}"
  >Verify <strong>${email}</strong></a
>
`,
  });
  res.status(201).json({ user: { name, email } });
};

module.exports = register;
