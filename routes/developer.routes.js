const { Router } = require('express');
const { developerController } = require('../controllers/developer.controller');

class developerRouter {
  constructor() {
    this.__router = Router();
    this.__configure();
  }

  getRoutes() {
    return this.__router;
  }

  __configure() {
    this.__router.get('/:id', (req, res) => {
      const { id } = req.params;

      res.json(developerController.findOne(+id));
    });

    this.__router.delete('/:id', (req, res) => {
      const { id } = req.params;

      developerController.deleteOne(+id);
      res.status(200).end();
    });

    this.__router.post('/', (req, res) => {
      const { name, surname, experience } = req.query;

      developerController.create(name, surname, experience);
      res.status(201).end();
    });

    this.__router.put('/:id', (req, res) => {
      const { body, params: { id } } = req;

      developerController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', (req, res) => {
      res.json(developerController.findAll());
    });
  }
}

exports.developerRouter = new developerRouter();