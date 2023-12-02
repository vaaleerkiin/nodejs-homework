const prisma = require("../../prisma");

const addContact = async (req, res, next) => {
  const result = await prisma.contact.create({
    data: { ...req.body, owner: req.user.id },
  });

  res.status(201).json(result);
};

module.exports = addContact;
