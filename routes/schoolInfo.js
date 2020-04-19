const express = require("express");
const router = express.Router();

const { userById } = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { create} = require("../controllers/schoolInfo");

router.post("/school/info/create/:userId", requireSignin, isAuth, isAdmin, create);

router.param("userId", userById);

module.exports = router;
