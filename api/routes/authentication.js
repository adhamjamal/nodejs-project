const express = require("express");
const route = express.Router();
const AuthenticationControllers = require("../controllers/authentication");

route.post("/login", AuthenticationControllers.login);

module.exports = route;
