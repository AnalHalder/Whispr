const express = require('express');
const protectRoute = require('../middlewares/auth.middleware')

const {
    logIn,
    signUp,
    logOut,
    checkAuth
} = require('../controllers/auth.controller')

const route = express.Router();

route.post("/login", logIn)
route.post("/signup", signUp)
route.post("/logout", logOut)
route.get("/check", protectRoute, checkAuth)

module.exports = route