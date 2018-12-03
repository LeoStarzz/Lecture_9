const { Router } = require('express');
const { managerController } = require('../controllers/manager.controller');

class managerRouter {
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

      res.json(managerController.findOne(+id));
    });

    this.__router.delete('/:id', (req, res) => {
      const { id } = req.params;

      managerController.deleteOne(+id);
      res.status(200).end();
    });

    this.__router.post('/', (req, res) => {
      const { name, surname, experience } = req.query;

      managerController.create(name, surname, experience);
      res.status(201).end();
    });

    this.__router.put('/:id', (req, res) => {
      const { body, params: { id } } = req;

      managerController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', (req, res) => {
      res.json(managerController.findAll());
    });
  }
}

exports.managerRouter = new managerRouter();