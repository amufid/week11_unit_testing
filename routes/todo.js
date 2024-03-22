const express = require('express')
const Controller = require('../controllers/todoController.js')
const router = express.Router()

router.get('/', Controller.findAll);
router.get('/:id', Controller.findOne);
router.post('/', Controller.create);
router.put('/:id', Controller.update);
router.delete('/:id', Controller.destroy)

module.exports = router
