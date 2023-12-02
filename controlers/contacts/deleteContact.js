const { HttpError } = require("../../helpers");
const prisma = require("../../prisma");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await prisma.contact.delete({
    where: { id: contactId, owner: req.user.id },
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

module.exports = deleteContact;
