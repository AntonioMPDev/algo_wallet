"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../controller/auth.controller");

var _verifySignup = require("../middlewares/verifySignup");

var _middlewares = require("../middlewares");

var router = (0, _express.Router)();
router.post('/signup', [_verifySignup.checkDuplicateUsernameOrEmail], _auth.signup);
router.post('/signin', _auth.signin);
router.get('/me', _middlewares.verifyToken, _auth.getMe);
var _default = router;
exports["default"] = _default;