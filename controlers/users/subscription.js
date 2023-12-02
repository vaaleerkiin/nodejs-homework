const { HttpError } = require("../../helpers");
const prisma = require("../../prisma");

const subscription = async (req, res, next) => {
  const result = await prisma.user.update({
    where: { id: req.user.id },
    data: req.body,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ subscription: result.subscription });
};

module.exports = subscription;
