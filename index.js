const express = require("express")
const app = express()

app.use(express.json())

let notes = [
    {
      "content": "nombre222ddd",
      "id": 3
    },
    {
      "content": "hola",
      "id": 14
    },
]

//const app = http.createServer((request, response) => {
//    response.writeHead(200, {"Content-Type": "application/json"})
//    response.end(JSON.stringify(notes))
//})

app.post("/api/notes", (request, response) => {
    const note = request.body

    if(!note || !note.content) {
        response.status(400).json({
            error: "note content is missing"

        })
    } else {
        response.status(404).end()
    }
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important != "undefined" ? note.important : false,
        date: new Date().toISOString()
    }

    notes =  [...notes, newNote]
    response.json(newNote)
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
