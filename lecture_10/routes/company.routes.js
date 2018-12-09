const { Router } = require('express');
const { companyController } = require('../controllers/company.controller');

class companyRouter {
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

      res.json(await companyController.findOne(+id));
    });

    this.__router.delete('/:id', async (req, res) => {
      const { id } = req.params;

      await companyController.deleteOne(+id);
      res.status(200).end();
    });

    this.__router.delete('/', async (req, res) => {
      await companyController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', async (req, res) => {
      const { name } = req.query;

      const id = await companyController.create(name);
      res.json(id);
      res.status(201).end();
    });

    this.__router.put('/:id', async (req, res) => {
      const { body, params: { id } } = req;
     
      await companyController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', async (req, res) => {
      res.json(await companyController.findAll());
    });
  }
}

exports.companyRouter = new companyRouter();