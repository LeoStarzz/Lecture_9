const { Router } = require('express');
const { ProjectController } = require('../controllers/project.controller');

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

      res.json(await ProjectController.findOne(+id));
    });

    this.__router.delete('/:id', async (req, res) => {
      const { id } = req.params;

      await ProjectController.deleteOne(+id);
      res.status(200).end();
    });

    this.__router.delete('/', async (req, res) => {

      await ProjectController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', async (req, res) => {
      const project = await ProjectController.create(req.body);
      
      res.json(project);
      res.status(201).end();
    });

    this.__router.put('/:id', async (req, res) => {
      const { body, params: { id } } = req;

      await ProjectController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', async (req, res) => {
      res.json(await ProjectController.findAll());
    });
  }
}

exports.projectRouter = new projectRouter();