const Todo=require("../models/todo");
exports.addTodo = async (req, res) => {
    let isSuccess, status, data, message;
    try {
        const newTodo = new Todo(req.body);
        const added = await newTodo.save();
        if (!added) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Error in adding new todo",
            });
        }
        isSuccess = true;
        status = 200;
        data = newTodo;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            todo: data,
            message: "Todo added successfully",
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Couldn't add todo due to internal server error! Please try again later",
        });
    }
};

//fetch all the todos
exports.listTodos = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        let todos = await Todo.find();
        if (todos.length == 0) {
            isSuccess = false;
            status = 403;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "No todos created",
            });
        }
        isSuccess = true;
        data = todos;
        status = 200;
        message = "todos fetched";
        res.status(status).json({
            isSuccess: isSuccess,
            todos: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in fetching todos due to internal server error. Please try again later",
        });
    }
};

// fetch particular todo by id
exports.findTodo = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        if (!req.params.id) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Please enter the todo id to fetch todo",
            });
        }
        let todoid = req.params.id;
        const todo=await Todo.findById(todoid);
        if (!todo) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message:
                    "Todo doesn't exists for the given todo Id. Please enter valid todo id.",
            });
        } 
        isSuccess = true;
        data = todo;
        status = 200;
        message = "todo fetched";
        res.status(status).json({
            isSuccess: isSuccess,
            todo: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in fetching todo due to internal server error. Please try again later",
        });
    }
};


// delete a todo with its todo id

exports.deleteTodo = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        if (!req.params.id) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Please enter the todo id to delete todo",
            });
        }
        let todoid = req.params.id;
        //todoid = +todoid; // converting into number
        const deletedTodo = await Todo.findByIdAndDelete(todoid);
        if (!deletedTodo) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message:
                    "Todo doesn't exists for the given todo id. Please enter valid todo id.",
            });
        }
        isSuccess = true;
        data = deletedTodo;
        status = 200;
        message = "todo deleted";
        res.status(status).json({
            isSuccess: isSuccess,
            todo: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in deleting todo due to internal server error. Please try again later",
        });
    }
};

//update todo
exports.updateTodo = async (req, res) => {
    let isSuccess, data, message, status;
    try {
        if (!req.params.id) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message: "Please enter the todo id to update todo",
            });
        }
        let todoid = req.params.id;
        const todo=await Todo.findOneAndUpdate({_id:todoid},req.body,{
            new:true
        });
        if (!todo) {
            isSuccess = false;
            status = 404;
            res.status(status).json({
                isSuccess: isSuccess,
                status: status,
                message:
                    "todo doesn't exists for the given todo id. Please enter valid todo id.",
            });
        }
        isSuccess = true;
        data = todo;
        status = 200;
        message = "todo updated";
        res.status(status).json({
            isSuccess: isSuccess,
            todo: data,
            status: status,
            message: message,
        });
    } catch (err) {
        isSuccess = false;
        status = 500;
        res.status(status).json({
            isSuccess: isSuccess,
            status: status,
            message:
                "Error in updating todo due to internal server error. Please try again later",
        });
    }
};
