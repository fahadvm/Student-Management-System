const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const adminAuth = require("../middleware/adminAuth");
const userModel = require("../model/userModel");

router.get("/login", adminAuth.isLogin, adminController.loadLogin);

router.post("/login", adminController.login);

router.get("/dashboard", adminAuth.checkSession, adminController.loadDashboard);

router.post("/addUser", adminAuth.checkSession, adminController.addUser);

router.post("/editUser", adminAuth.checkSession, adminController.editUser);

router.delete("/delete-user/:id", adminAuth.checkSession, adminController.deleteUser);

router.post("/logout", adminAuth.checkSession, adminController.logout);

router.get("/search", adminAuth.checkSession, adminController.searchUsers);

module.exports = router;

