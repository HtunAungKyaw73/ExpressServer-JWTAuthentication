const Todo = require("../models/Todo");

async function getAllTodos(){
    const todos = await Todo.find();
    if(Array.isArray(todos) && !todos.length) throw new Error('Empty database');
    return todos;
}

async function getTodoById(id){
    const todo = await Todo.findById(id);
    if (!todo) throw new Error('No todo found with id ' + id);
    return todo;
}

async function saveTodo(todo){
    const newTodo = new Todo(todo);
    return newTodo.save();
}

async function updateTodo(id, todo){
    const oldTodo = await Todo.findById(id);
    if (oldTodo) {
        return Todo.findByIdAndUpdate(id, todo, {new: true});
    }
    else {
        throw new Error("Todo with id " + id + " not found");
    }
}

async function deleteTodo(id){
    const oldTodo = await Todo.findById(id);
    if (oldTodo) {
        return Todo.findByIdAndDelete(id);
    }
    else {
        throw new Error("Todo with id " + id + " not found");
    }
}

module.exports = {
    getAllTodos,
    getTodoById,
    saveTodo,
    updateTodo,
    deleteTodo,
}