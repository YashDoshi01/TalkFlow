const express = require("express");
const {signup} = require("../controllers/auth.Contorller");
const app = express();

const router = express.Router();

router.post("/signup",signup);

module.exports = router;