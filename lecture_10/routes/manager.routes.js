const { Router } = require('express');
const { ManagerController } = require('../controllers/manager.controller');

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

      res.json(await ManagerController.findOne(id));
    });

    this.__router.delete('/:id', async (req, res) => {
      const { id } = req.params;

      await ManagerController.deleteOne(id);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).end();
    });

    this.__router.delete('/', async (req, res) => {
      await ManagerController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', async (req, res) => {
      const manager = await ManagerController.create(req.body);

      res.json(manager);
      res.status(201).end();
    });

    this.__router.put('/:id', async (req, res) => {
      const { body, params: { id } } = req;

      await ManagerController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', async (req, res) => {
      res.json(await ManagerController.findAll());
    });
  }
}

exports.managerRouter = new managerRouter();