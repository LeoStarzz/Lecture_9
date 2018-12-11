const { Router } = require('express');
const { CompanyController } = require('../controllers/company.controller');

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

      res.json(await CompanyController.findOne(id));
    });

    this.__router.delete('/:id', async (req, res) => {
      const { id } = req.params;

      await CompanyController.deleteOne(id);
      res.status(200).end();
    });

    this.__router.delete('/', async (req, res) => {
      await CompanyController.deleteAll();
      res.status(200).end();
    });

    this.__router.post('/', async (req, res) => {
      const company = await CompanyController.create(req.body);
     
      res.json(company);
      res.status(201).end();
    });

    this.__router.put('/:id', async (req, res) => {
      const { body, params: { id } } = req;
     
      await CompanyController.updateOne(id, body);
      res.status(200).end();
    });

    this.__router.get('/', async (req, res) => {
      res.json(await CompanyController.findAll());
    });
  }
}

exports.companyRouter = new companyRouter();