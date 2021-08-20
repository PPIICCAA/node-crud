const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

let notes = [
    {
      "title": "nombre222ddd",
      "id": 3
    },
    {
      "title": "hola",
      "id": 14
    },
]

//const app = http.createServer((request, response) => {
//    response.writeHead(200, {"Content-Type": "application/json"})
//    response.end(JSON.stringify(notes))
//})

app.post("/api/notes", (request, response) => {
    const note = request.body

    if(!note || !note.title) {
        return response.status(400).json({
            error: "note title is missing"
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        title: note.title,
        important: typeof note.important != "undefined" ? note.important : false,
        date: new Date().toISOString()
    }

    notes =  [...notes, newNote]
    response.status(201).json(newNote)
})
app.patch("/api/notes/:id", (request, response) => {
    notes.map(note => {
        if (note.id === parseInt(request.params.id)) {
            note.title= request.body.title,
            note.important= request.body.important,
            note.date= request.body.date
        }
    })
    response.status(201).json(notes)
})
app.get("/", (request, response) => {
    response.send("<h1>hello world</h1>")
})
app.get("/api/notes", (request, response) => {
    response.json(notes)
})
app.get("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Runing in " + PORT)
})
