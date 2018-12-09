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
    this.__router.get('/:id', async (req, res) => {
      const { id } = req.params;

      res.json(await managerController.findOne(+id));
    });

    this.__router.delete('/:id', async (req, res) => {
      const { id } = req.params;

      await managerController.deleteOne(+id);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).end();
    });

    this.__router.delete('/', async (req, res) => {

      await managerController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', async (req, res) => {
      const { name, surname, experience } = req.query;

      const id = await managerController.create(name, surname, experience);
      res.json(id);
      res.status(201).end();
    });

    this.__router.put('/:id', async (req, res) => {
      const { body, params: { id } } = req;

      await managerController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', async (req, res) => {
      res.json(await managerController.findAll());
    });
  }
}

exports.managerRouter = new managerRouter();