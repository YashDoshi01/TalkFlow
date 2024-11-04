const express = require("express");
const {signup , login ,checkLogin} = require("../controllers/auth.Contorller");
const app = express();

const router = express.Router();

router.post("/signup",signup);
router.post("/login" ,login);
router.post("/checklogin" , checkLogin)
// router.get("/cookie" , cookieMake);


module.exports = router;