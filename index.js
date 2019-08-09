const express = require("express");
const server = express();
const data = require("./database");
server.use(express.json());

server.get("/", (req, res) => {
  console.log(data);
  res.status(200).json(data);
});

server.post("/", (req, res) => {
  newPerson = req.body;
  data.push(newPerson)
  res.status(200).json(newPerson);
});

server.delete('/:id', (req, res) => {
    const id = req.params.id
    data.splice(id, 1)
    res.status(200).json(data)
})

server.put('/:id', (req, res) => {
    const replacement = req.body
    const id = req.params.id
    data.splice(id, 1, {replacement})
    res.status(200).json(data)
})


server.listen(8000, () => {
  console.log("API Running");
});