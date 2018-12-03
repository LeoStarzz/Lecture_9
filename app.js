const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

const { companyRouter } = require('./routes/company.routes');
const { projectRouter } = require('./routes/project.routes');
const { managerRouter } = require('./routes/manager.routes');
const { developerRouter } = require('./routes/developer.routes');

app.use(bodyParser.json());

app.use('/companies', companyRouter.getRoutes());
app.use('/projects', projectRouter.getRoutes());
app.use('/managers', managerRouter.getRoutes());
app.use('/developers', developerRouter.getRoutes());

app.listen(port, function () {
  console.log('App listening on port 8080!');
});