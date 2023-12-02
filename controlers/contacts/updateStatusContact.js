const { HttpError } = require("../../helpers");
const prisma = require("../../prisma");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await prisma.contact.update({
    where: { id: contactId, owner: req.user.id },
    data: req.body,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateStatusContact;
