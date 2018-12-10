const { Router } = require('express');
const { DeveloperController } = require('../controllers/developer.controller');

class developerRouter {
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

      res.json(await DeveloperController.findOne(+id));
    });

    this.__router.delete('/:id', async (req, res) => {
      const { id } = req.params;

      await DeveloperController.deleteOne(+id);
      res.status(200).end();
    });

    this.__router.delete('/', async (req, res) => {

      await DeveloperController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', async (req, res) => {
      const developer = await DeveloperController.create(req.body);
      
      res.json(developer);
      res.status(201).end();
    });

    this.__router.put('/:id', async (req, res) => {
      const { body, params: { id } } = req;

      await DeveloperController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', async (req, res) => {
      res.json(await DeveloperController.findAll());
    });
  }
}

exports.developerRouter = new developerRouter();