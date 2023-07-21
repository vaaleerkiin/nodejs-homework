const { HttpError, sendMail } = require("../../helpers");
const { User } = require("../../models/user");
const { BASE_URL } = process.env;

const verify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.verify) {
    throw HttpError(404);
  }

  const verificationToken = user.verificationToken;

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
  res.status(200).json({ message: "Verification email sent" });
};
module.exports = verify;
