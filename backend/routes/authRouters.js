const { login, signup } = require("../controllers/authControllers");
const { loginValidation,  signupValidation} = require("../middlewares/authValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);

router.post("/signup", signupValidation, signup);

module.exports = router;
