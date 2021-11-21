const lowdb = require('lowdb')
const express = require('express')
const FileSync = require('lowdb/adapters/FileSync')
const cors = require('cors')
const details = require('./controller/eventDetails')
const auth = require('./controller/auth')
const adapter = new FileSync('db.json')
const PORT = 8000
db = lowdb(adapter)
const app = express()


app.use(express.json())
app.use(cors())

//kopplar servern till frontend
app.use(express.static('../frontend'))
app.use(express.static('../frontend/eventPage'))
app.use(express.static('../frontend/buy'))

function initDatabase(){
    db.defaults({ event: [], tickets: [], staff: [] }).write()
}

let event

app.get('/api/event', (req, res) => {
    res.json(event)
})

app.get('/api/event/:id', (req, res) => {
    details.getEventDetails(req,res)
})

app.post('/api/ticket', (req, res) => {
    details.orderTicket(req,res)
})

app.get('/api/ticket/:ticketId', (req, res) => {
    details.createTicket(req,res)
})

app.put('/api/ticket/:ticketId', (req, res) => {
    details.verifyTicket(req,res)
})

app.post('/api/auth', (req, res) => {
    auth.login(req,res)
})

app.get('/api/auth/loggedIn', (req, res) => {
    auth.checkIfLoggedIn(req, res)
})



app.listen(PORT, () =>{
    console.log('Server started on port: ', PORT)
    initDatabase()
    event = db.get('event').value()
});