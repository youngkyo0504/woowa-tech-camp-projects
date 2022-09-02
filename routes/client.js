var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "My 배민" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "로그인" });
});

router.get("/sign_up/agreement", function (req, res, next) {
  res.render("agreement", { title: "회원가입" });
});

router.get("/sign_up/phone", function (req, res, next) {
  res.render("phone", { title: "회원가입" });
});

router.get("/sign_up/user", function (req, res, next) {
  res.render("user", { title: "회원가입" });
});

module.exports = router;
