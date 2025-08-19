const todoService = require("../services/TodoService");
const errorHandler = require("../middlewares/httpErrorHandler");

async function getAllTodosHandler(req, res, next) {
    const todos = await todoService.getAllTodos();

    // session based data return
    if(req.session.user){
        return res.status(200).send(req.session.todos);
    }

    // all data from server
    res.status(200).json({
        status: "success",
        data: todos,
    })
}

async function getTodoByIdHandler(req, res, next) {
    const id = req.params.id;
    const todo = await todoService.getTodoById(id);
    res.status(200).json({
        status: "success",
        data: todo,
    })
}

async function saveTodoHandler(req, res, next){
    const body = req.body;
    const todo = await todoService.saveTodo(body);
    console.log("Todo added successfully:", todo);

    // for session based data store
    const {todos} = req.session;
    if(todos)
        todos.push(todo);
    else
        req.session.todos = [todo];

    res.status(201).json({
        status: "success",
        data: todo
    })
}

async function updateTodoHandler(req, res, next){
    const id = req.params.id;
    const body = req.body;
    const updatedTodo = await todoService.updateTodo(id, body);
    console.log("Update successfully:", updatedTodo);
    res.status(200).json({
        status: "success",
        data: updatedTodo
    })
}

async function deleteTodoHandler(req, res, next){
    const id = req.params.id;
    const deletedTodo = await todoService.deleteTodo(id);
    console.log("Deleted successfully:", deletedTodo);
    res.status(200).json({
        status: "success",
        data: deletedTodo
    })
}

const getAllTodos = async (req, res, next) => await errorHandler.httpErrorHandler(getAllTodosHandler, 404)(req, res, next);
const getTodoById = async (req, res, next) => await errorHandler.httpErrorHandler(getTodoByIdHandler, 400)(req, res, next);
const saveTodo = async (req, res, next) => await errorHandler.httpErrorHandler(saveTodoHandler, 500)(req, res, next);
const updateTodo = async(req,res,next)=> await errorHandler.httpErrorHandler(updateTodoHandler, 404)(req, res, next);
const deleteTodo = async (req,res,next)=> await errorHandler.httpErrorHandler(deleteTodoHandler, 404)(req, res, next);

module.exports = {
    getAllTodos,
    getTodoById,
    saveTodo,
    updateTodo,
    deleteTodo,
}