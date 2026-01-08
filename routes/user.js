const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const auth = require("../middleware/auth")

router.get("/register", auth.preventBackToRegister, userController.loadRegister);
router.post('/register', userController.registerUser);

router.get("/login", auth.isLogin, userController.loadLogin)
router.post("/login", userController.login)

router.get("/home", auth.checkSession, userController.loadHome)

router.post("/logout", auth.checkSession, userController.logout)

router.get("/check-session", auth.checkSession, (req, res) => {
    res.status(200).send("Session valid");
});

module.exports = router

