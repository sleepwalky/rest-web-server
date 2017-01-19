const express = require('express');

const routes = function (Todo) {
    const todoRouter = express.Router();
    todoRouter.route('/')
        .post((req, res) => {
            const todo = new Todo(req.body);
            todo.save();
            res.status(201).send(todo);
        })
        .get((req, res) => {
            Todo.find(function (err, todos) {
                if (err) {
                    console.log('error ' + err);
                    res.status(500).send(err);
                } else {
                    res.json(todos);
                }
            })
        })
        return todoRouter;
}

module.exports = routes;