//Enviroment
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

//Module
const Person = require('./mongo');

// Use express
const app = express();

//Create Token Id
morgan.token('id', (req) => req.id);

// Create el body
morgan.token('body', (req) => JSON.stringify(req.body) || '-');

//Cors
app.use(cors());

//Static
app.use(express.static('dist'));

// Use express
app.use(express.json());

app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

app.use(morgan(':id :method :url :body :response-time '));

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  }).catch((err) => {
    console.log(err);
    res.status(500).end();
  });
});

app.get('/info', (req, res) => {
  const date = new Date();
  Person.find({}).then((response) => {
    return res.send(
      `<div><p>Phonebook has info for ${response.length} people</p><br/>${date}</div>`
    );
  }).catch((err) => {
    console.log(err);
    res.status(500).end();
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((response) => {
      response ? res.json(response) : res.status(404).send({
        message: 'user not found',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((response) => {
      response ? res.status(204).end() : res.status(404).send({
        message: 'user not found',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

app.put('/api/persons/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    number: req.body.number,
  }, { new: true })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
});

app.post('/api/persons', async (req, res) => {
  const body = req.body || {};
  const name = req.body.name;
  const searchPerson = await Person.find({ name });
  if (searchPerson.length === 0) {
    if (!body.name) {
      return res.status(404).send({
        message: 'name missing',
      });
    }
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person
      .save()
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  } else {
    return res.status(400).send({
      message: 'the name already exists',
    });
  }
});

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
