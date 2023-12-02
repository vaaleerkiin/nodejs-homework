const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const prisma = require("../../prisma");
const { defaultAvatar } = require("../../scheme/user");
const booksDir = path.join(__dirname, "../", "../", "public", "avatars");

const avatars = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;

  const user = req.user;
  const newName = `${user.id}_${uuidv4()}_${originalname}`;

  const resultUpload = path.join(booksDir, newName);
  await fs.rename(tempUpload, resultUpload);
  const cover = path.join("avatars", newName);

  if (user.avatarURL !== defaultAvatar) {
    const prevAvatar = path.join(booksDir, "../", user.avatarURL);
    fs.unlink(prevAvatar).catch(console.log);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { avatarURL: cover },
  });

  res.status(201).json({ message: cover });
};

module.exports = avatars;
