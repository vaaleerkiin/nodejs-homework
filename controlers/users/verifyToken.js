const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, { verify: true });
  res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyToken;
