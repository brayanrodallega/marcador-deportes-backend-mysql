const express = require('express')
const routes = express.Router()

// route for select
routes.get('/:table', (req, res) => {
    //res.send('Ahora si viene el select')
    req.getConnection((error, conn) => {
        if (error) return res.send(error)

        let sql = 'SELECT * FROM ' + req.params.table;
        conn.query(sql, (error, rows) => {
            if (error) return res.send(error)

            res.json(rows)
        })
    })
})

//route for insert
routes.post('/:table', (req, res) => {
   req.getConnection((error, conn) => {
        if (error) return res.send(error)

        let sql = 'INSERT INTO ' + req.params.table + ' SET ?'; 
        conn.query(sql, [req.body], (error) => {
            if (error) return res.send(error)

            res.send('Add OK!')
        })
    })
})

//route for update
routes.put('/:table/:field/:id', (req, res) => {
    req.getConnection((error, conn) => {
        if (error) return res.send(error)

        let sql = 'UPDATE ' + req.params.table + ' SET ? WHERE ' + req.params.field + '_id = ?'
        conn.query(sql, [req.body, req.params.id], (error, rows) => {
            if (error) return res.send(error)

            res.send('Book Updated OK!')
        })
    })
})

//route for delete
routes.delete('/:table/:field/:id', (req, res) => {
    req.getConnection((error, conn) => {
        if (error) return res.send(error)

        let sql = 'DELETE FROM ' + req.params.table + ' WHERE ' + req.params.field + '_id = ?'
        conn.query(sql, [req.params.id], (error, rows) => {
            if (error) return res.send(error)

            res.send('Book remove OK!')
        })
    })
})

module.exports = routes