const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.static('public'))

app.use(express.json({limit: '1mb'}))

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bookshelf'
})

//connect
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('mysql connected')
})


//create db
app.get('/createdb', (req, res) => {
    let sql = `CREATE DATABASE bookshelf`
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        console.log(result)
        res.send('database created...')
    })
})

//insert book
app.get('/addbook', (req, res) => {
    
})

app.get('/api', (request, res) => {
    let sql = 'SELECT DISTINCT title, author, year FROM books'
    
    let query = db.query(sql, (err, results) => {
        if (err) throw err
        console.log(results)
        res.send(results) //instead of send yo ucan do response.json
    })

    //response.send(sql)
})

app.post('/api', (request, response) => {
    console.log("I got a request!")
    const data = request.body

    console.log(data)

    response.json(data)

    let sql = 'INSERT INTO books SET ?'
    let book = data
    
    let query = db.query(sql, book, (err, result) => {
        if (err) throw err
        console.log(result)
    })

})

app.listen('3000', () => {
    console.log('Server started on port 3000')
})





