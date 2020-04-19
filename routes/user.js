const express = require("express");
const router = express.Router();

const {
  userById,
  read,
  update,
  update2,
  userByIdGet,
  list,
  remove
} = require("../controllers/user");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});
router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);
router.put("/user/:userIdD/:userId", requireSignin, isAuth, update2);
router.get("/users/:userId", requireSignin, isAuth, list);
router.delete("/user/:userIdD/:userId", requireSignin, isAuth, isAdmin, remove);

router.param("userId", userById);
router.param("userIdD", userByIdGet);

module.exports = router;
