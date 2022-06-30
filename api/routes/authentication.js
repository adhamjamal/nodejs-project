const express = require("express");
const route = express.Router();
const AuthenticationControllers = require("../controllers/authentication");

route.post("/login", AuthenticationControllers.login);

// user registration route
route.post("/register", AuthenticationControllers.register);

module.exports = route;
