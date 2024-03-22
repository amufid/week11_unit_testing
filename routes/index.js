const express = require('express');
const todoRouter = require('./todo.js');

const router = express.Router()

router.use('/api/todo', todoRouter)

module.exports = router