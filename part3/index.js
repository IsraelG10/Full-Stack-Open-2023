const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");


// Use express
const app = express();

//Create Token Id
morgan.token('id', (req) => (req.id))

// Create el body
morgan.token('body', (req) => JSON.stringify(req.body) || "-");

//Cors
app.use(cors());

// Use express
app.use(express.json());

app.use((req, res, next) => {
  req.id = uuidv4();
  next();
})

app.use(
  morgan(':id :method :url :body :response-time ')
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Israel Gualan",
    number: "0988389058",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((item) => item.id)) : 0;
  return maxId + 1;
};

app.get("/api/persons", (req, res) => {
  return res.json(persons);
});

app.get("/info", (req, res) => {
    const date = new Date();
    const info = persons.length;
    return res.send(`<div><p>Phonebook has info for ${info} people</p><br/>${date}</div>`)
  });

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((item) => item.id === id);
  if (person) {
    res.send(person);
  } else {
    res.send(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((item) => item.id !== id);
  return res.status(201).send({
    message: 'User deleted: ' + id,
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body || {};
  const searchPerson = persons.some((item) => item.name === body.name)
  if (!searchPerson) {
    if (!body.name) {
      return res.status(404).send({
        message : "name missing",
      });
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };

    persons = persons.concat(person);
    return res.json(person);
  } else {
    return res.status(400).send({
      message: "the name already exists"
    })
  }

});

const PORT = process.env.PORT || 3001 ;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
