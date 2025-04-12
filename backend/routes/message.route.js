const express = require('express');
const protectRoute = require('../middlewares/auth.middleware');
const { getUsers, getMessages, sendMessage } = require('../controllers/message.controller')

const route = express.Router();

route.get("/users", protectRoute, getUsers)
route.get("/:id", protectRoute, getMessages)
route.post("/send/:id", protectRoute, sendMessage)

module.exports = route 