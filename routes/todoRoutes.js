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
        });

    todoRouter.use('/:todoId', function (req, res, next) {
        Todo.findById(req.params.todoId, function (err, todo) {
            if (err)
                res.status(500).send(err);
            else if (todo) {
                req.todo = todo;
                next();
            } else {
                res.status(404).send('no todo found');
            }
        });
    });
    todoRouter.route('/:todoId')
        .get(function (req, res) {
            res.json(req.todo);
        })
        .put(function (req, res) {
            req.todo.name = req.body.name;
            req.todo.descr = req.body.descr;
            req.todo.hours = req.body.hours;
            req.todo.type = req.body.type;
            req.todo.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.todo);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
                

            for (let p in req.body) {
                req.todo[p] = req.body[p];
            }

            req.todo.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.todo);
                }
            });
        })
        .delete(function (req, res) {
            req.todo.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });

    return todoRouter;
}

module.exports = routes;