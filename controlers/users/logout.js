const prisma = require("../../prisma");

const logout = async (req, res, next) => {
  const { id } = req.user;
  await prisma.user.update({
    where: { id },
    data: { token: "" },
  });

  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
