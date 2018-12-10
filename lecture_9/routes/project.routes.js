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
    this.__router.get('/:id', (req, res) => {
      const { id } = req.params;

      res.json(projectController.findOne(+id));
    });

    this.__router.delete('/:id', (req, res) => {
      const { id } = req.params;

      projectController.deleteOne(+id);
      res.status(200).end();
    });

    this.__router.delete('/', (req, res) => {

      projectController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', (req, res) => {
      const { name, mode } = req.query;

      const project = projectController.create(name, mode);
      res.json(project);
      res.status(201).end();
    });

    this.__router.put('/:id', (req, res) => {
      const { body, params: { id } } = req;

      projectController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', (req, res) => {
      res.json(projectController.findAll());
    });
  }
}

exports.projectRouter = new projectRouter();