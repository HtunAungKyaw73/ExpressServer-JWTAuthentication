var express = require('express');
var router = express.Router();
//const todos = require('../data/todo-data');
const todos = require('../controllers/TodoController');
const sessionHandler = require("../middlewares/sessionHandler");

router.get('/', sessionHandler, todos.getAllTodos);
router.get('/:id', todos.getTodoById);
router.post('/', todos.saveTodo);
router.put('/:id', todos.updateTodo);
router.delete('/:id', todos.deleteTodo);

module.exports = router;