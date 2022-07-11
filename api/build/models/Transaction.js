"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var TransactioSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  txId: String,
  amount: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Transaction', TransactioSchema);

exports["default"] = _default;