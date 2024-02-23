const express = require("express");
const router = express.Router();

const {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const validateToken = require("../middleware/validateTokenHandler");

// router.route("/").get(getContacts).post(createContact);

router.use(validateToken) ; 

router.get("/", getContacts);

router.route("/").post(createContact) ; 

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

router.post("/update", updateContact);

module.exports = router;
