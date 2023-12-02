const { HttpError } = require("../../helpers");
const prisma = require("../../prisma");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await prisma.contact.findUnique({
    where: { id: contactId, owner: req.user.id },
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getById;
