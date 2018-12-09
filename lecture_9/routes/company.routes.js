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
    this.__router.get('/:id', (req, res) => {
      const { id } = req.params;

      res.json(companyController.findOne(+id));
    });

    this.__router.delete('/:id', (req, res) => {
      const { id } = req.params;

      companyController.deleteOne(+id);
      res.status(200).end();
    });

    this.__router.delete('/', (req, res) => {
      companyController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', (req, res) => {
      const { name } = req.query;

      const id = companyController.create(name);
      res.json(id);
      res.status(201).end();
    });

    this.__router.put('/:id', (req, res) => {
      const { body, params: { id } } = req;
     
      companyController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', (req, res) => {
      res.json(companyController.findAll());
    });
  }
}

exports.companyRouter = new companyRouter();