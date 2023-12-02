const prisma = require("../../prisma");

const getAll = async (req, res, next) => {
  // const { page = 1, limit = 10, favorite } = req.query;
  // const skip = (page - 1) * limit;
  // const filter = favorite
  //   ? { owner: req.user._id, favorite }
  //   : { owner: req.user._id };

  // const data = await Contact.find(filter, "-createdAt -updatedAt", {
  //   skip,
  //   limit,
  // }).populate("owner", "name email");

  const data = await prisma.contact.findMany({ where: { owner: req.user.id } });

  res.json(data);
};
module.exports = getAll;
