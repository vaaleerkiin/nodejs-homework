const { HttpError } = require("../../helpers");
const prisma = require("../../prisma");

const verifyToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await prisma.user.findUnique({
    where: { verificationToken },
  });

  if (!user) {
    throw HttpError(404, "User not found");
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { verify: true },
  });
  res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyToken;
