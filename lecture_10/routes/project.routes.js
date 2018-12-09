const { Router } = require('express');
const { projectController } = require('../controllers/project.controller');

class projectRouter {
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

      res.json(await projectController.findOne(+id));
    });

    this.__router.delete('/:id', async (req, res) => {
      const { id } = req.params;

      await projectController.deleteOne(+id);
      res.status(200).end();
    });

    this.__router.delete('/', async (req, res) => {

      await projectController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', async (req, res) => {
      const { name, mode } = req.query;

      const id = await projectController.create(name, mode);
      res.json(id);
      res.status(201).end();
    });

    this.__router.put('/:id', async (req, res) => {
      const { body, params: { id } } = req;

      await projectController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', async (req, res) => {
      res.json(await projectController.findAll());
    });
  }
}

exports.projectRouter = new projectRouter();