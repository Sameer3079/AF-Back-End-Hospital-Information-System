const Express = require('express');
const Route = Express.Router();
const DepartmentController = require('./Deparment.Controller');

// add new department.
Route.post('/', (req, res) => {
  DepartmentController.addNewDepartment(req.body)
    .then(data => {
      res.status(data.status).send({ message: data.message });
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message });
    });
});

// update department
Route.put('/:id', (req, res) => {
  DepartmentController.Update(req.params.id, req.body)
    .then(data => {
      res.status(data.status).send({ message: data.message });
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message });
    });
});

// delete department
Route.delete('/:id', (req, res) => {
  DepartmentController.Delete(req.params.id)
    .then(data => {
      res.status(data.status).send({ message: data.message });
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message });
    });
});

// get department details
Route.get('/', (req, res) => {
  DepartmentController.getAll()
    .then(data => {
      res.status(data.status).send(data.Data);
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message });
    });
});

module.exports = Route;
