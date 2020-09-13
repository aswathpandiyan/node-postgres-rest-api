const send = require("../helper/response");
const createError = require("http-errors");
const mongoose = require("mongoose");
const log = require("../helper/logger");
const token = require("../helper/token");

const User = require("../model/users");

exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    send.json(res, result);
  } catch (err) {
    log.error(err.message);
    if (err.name === "ValidationError") {
      next(createError(422, err.message));
      return;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne(req.body, { __v: 0, password: 0 });
    console.log(user);
    if (!user) {
      throw createError(404, "User does not exist");
    }
    const accessToken = token.generateAccessToken({
      _id: user.id.toString(),
      username: user.username,
    });
    send.json(res, { accessToken: accessToken });
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      next(createError(400, "Invalid username or password"));
      return;
    }
    next(err);
  }
};
