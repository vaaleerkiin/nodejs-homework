const express = require("express");

const {
  getAll,
  getById,
  addContact,
  deleteContact,
  editContact,
} = require("../../controlers/contacts");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validateBody");
const { shema } = require("../../models/contact");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", isValidId, validateBody(shema.addShema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", isValidId, validateBody(shema.addShema), editContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(shema.updateFavoriteSchema),
  editContact
);

module.exports = router;
