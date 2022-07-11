"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _transactions = require("../controller/transactions.controller");

var _middlewares = require("../middlewares");

var _addressChecking = require("../middlewares/addressChecking");

var router = (0, _express.Router)();
router.get('/user/:id', _middlewares.verifyToken, _transactions.getTransactions);
router.post('/', [_middlewares.verifyToken, _addressChecking.addressChecking], _transactions.makeTransaction);
var _default = router;
exports["default"] = _default;