// imports & setup
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
require('dotenv').config()

// consts
const port = '5000'

//middleware
app.use(express.json())

// routes
app.post('/todos', async (req, res) => {
    try {
        const { todo_title } = req.body
        const newTodo = await pool.query('INSERT INTO todo (todo_title) VALUES($1)', [ todo_title ])
        res.json(newTodo.rows)
    } catch (err) {
        console.error(err)
    }
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await pool.query('SELECT * FROM todo')
        res.json(todos.rows)
    } catch (err) {
        
    }
})

app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
        res.json(todo.rows[0])
        console.log(todo.rows[0])
    } catch (err) {
        console.error(err)
    }
})

app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { todo_title } = req.body
        const updateTodo = await pool.query('UPDATE todo SET todo_title = $1 WHERE todo_id = $2', [todo_title, id])
        res.json('todo was updated.')
    } catch (err) {
        console.error(err)
    }
})

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
        res.json('todo was deleted.')
    } catch (err) {
        console.error(err)
    }
})
app.listen(port, () => {
    console.log('running on port:', port)
})