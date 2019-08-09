const express = require("express");
const server = express();
const data = require("./database");
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json(data);
});

// ------------------------------------------------------------------------------------------

server.get('/:id', (req, res) => {
  const id = req.params.id;
  const [selectedId] = data.filter( e => e.id == id)
  if(selectedId){
    res.status(200).json(selectedId)
  } else {res.status(400).json({message: "Person could not be located."})}
})

// ------------------------------------------------------------------------------------------

server.get('/:id/chores', (req,res)=>{
  const id = req.params.id;
  const completed = req.query.completed
  let [selectedId] = data.filter( person => person.id == id);
  if(selectedId){
      if(completed == "true"){
          let finishedChores = selectedId.chores.filter(chore => chore.completed === true)
          res.status(200).json(finishedChores)
      } else { res.status(200).json(selectedId.chores)}} 
       else { res.status(400).json({message: "Person could not be located."})}
})

// ------------------------------------------------------------------------------------------


server.delete('/:id/chores/:choreId', (req,res)=>{
  const userId = req.params.id;
  const choreId = req.params.choreId
  let [selectedId] = data.filter( person => person.id == userId);
  let newChores = selectedId.chores.filter(chore => chore.id != choreId)
  if(selectedId){
    selectedId.chores = [...newChores]
    res.status(200).json(selectedId.chores)
  } else {res.status(400).json({message: "Oh no! Couldn't find that user!"})}
})
// ------------------------------------------------------------------------------------------

server.post('/:id/chores', (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  let [selectedId] = data.filter( person => person.id == id);
  if(!body.assignedTo) {
      res.status(404).json({message: "Assignto not defined"})
  } else if(selectedId){
    selectedId.chores.push(body);
      res.status(200).json(selectedId.chores)
  } else {res.status(400).json({message: "Person could not be located."})  }
})

// ------------------------------------------------------------------------------------------

server.put('/:id/chores', (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  let [selectedId] = data.filter( person => person.id == id);
  if(!body.assignedTo && !body.id) {
      res.status(404).json({message: "Assignto or ID not defined "})
  } else if(selectedId){
     let newChores = selectedId.chores.filter(chore => chore.id != body.id);
     selectedId.chores = [...newChores, body]
      res.status(200).json(selectedId.chores)
  }  else {res.status(400).json({message: "Person could not be located."}) }
})


// ------------------------------------------------------------------------------------------
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("API Running");
});