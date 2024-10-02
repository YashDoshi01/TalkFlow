const express = require("express");
const {signup , login ,requireAuth} = require("../controllers/auth.Contorller");
const app = express();

const router = express.Router();

router.post("/signup",signup);
router.post("/login" ,login);
// router.get("/cookie" , cookieMake);


module.exports = router;