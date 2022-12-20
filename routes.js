const express = require('express')
const routes = express.Router()

// Route for get all tables
routes.get('/:table', (req, res) => {
    //res.send('Ahora si viene el select')
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        let sql = 'SELECT * FROM ' + req.params.table;
        conn.query(sql, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

// Route for get one register
routes.post('/:table', (req, res) => {
   req.getConnection((err, conn) => {
        if (err) return res.send(err)

        let sql = 'INSERT INTO ' + req.params.table + ' SET ?'; 
        conn.query(sql, [req.body], (err) => {
            if (err) return res.send(err)

            res.send('Add OK!')
        })
    })
})

// Route for update
routes.put('/:table/:field/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        let sql = 'UPDATE ' + req.params.table + ' SET ? WHERE ' + req.params.field + '_id = ?'
        conn.query(sql, [req.body, req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('Updated OK!')
        })
    })
})

// Route for delete
routes.delete('/:table/:field/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        let sql = 'DELETE FROM ' + req.params.table + ' WHERE ' + req.params.field + '_id = ?'
        conn.query(sql, [req.params.id], (err, rows) => {
            if (err) return res.send(err)

            res.send('Remove OK!')
        })
    })
})

// Route for login user
routes.get('/:table/:email/:clave', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        let sql = "SELECT * FROM " + req.params.table + " WHERE usu_email = '" + req.params.email + "' AND usu_clave = '" + req.params.clave + "'";
        conn.query(sql, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

// Route for list register with limit
routes.get('/:table/:limit/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)

        let ssql = "SELECT t1.eve_id AS sec, date_format(t1.eve_fecha, '%d-%m-%Y') AS fecha, t2.equ_nombre AS equi1, t3.equ_nombre AS equi2, t1.eve_marca1 AS marca1, t1.eve_marca2 AS marca2, t4.dep_nombre AS deporte, t1.eve_descrip AS descrip " + 
        "FROM eventos t1 " + 
        "LEFT JOIN equipos t2 ON t1.equ_equipo1 = t2.equ_id " + 
        "LEFT JOIN equipos t3 ON t1.equ_equipo2 = t3.equ_id " + 
        "LEFT JOIN deportes t4 ON t1.dep_id = t4.dep_id " + 
        "ORDER BY 1 DESC LIMIT " + req.params.lim;

        conn.query(ssql, (err, rows) => {
            if (err) return res.send(err)

            res.json(rows)
        })
    })
})

// Export routes for server.js to use.
module.exports = routes;