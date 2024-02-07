const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


// Use express
const app = express();

//Create Token Id
morgan.token('id', (req) => (req.id))

// Create el body
morgan.token('body', (req) => JSON.stringify(req.body) || "-");

//Cors
app.use(cors());

//Static
app.use(express.static('dist'));

// Use express
app.use(express.json());

app.use((req, res, next) => {
  req.id = uuidv4();
  next();
})

app.use(
  morgan(':id :method :url :body :response-time ')
);

const person_data = fs.readFileSync('data.json', 'utf-8');

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((item) => item.id)) : 0;
  return maxId + 1;
};

let persons = JSON.parse(person_data);

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
  const person = persons.filter((item) => item.id !== id);
  fs.writeFileSync('data.json', JSON.stringify(person), 'utf-8');
  return res.status(201).send({
    message: 'User deleted: ' + id,
  });
});

app.put("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const index = persons.findIndex((item) => item.id === id);
  if (index !== -1 ) {
    persons[index] = {...persons[index], ...body}
    fs.writeFileSync('data.json', JSON.stringify(persons), 'utf-8');
    return res.status(200).send({
      message: 'user update: ' + id,
    })
  } else {
    return res.status(404).send({
      message: 'user not found: ' + id,
    });
  }
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
    fs.writeFileSync('data.json', JSON.stringify(persons), 'utf-8');
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
