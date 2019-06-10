const express                   = require('express');
const route                     = express.Router();
const AdminController           = require('./Admin.controller');

// route.post('/loginAdmin', (req, res) => {
//
//     AdminController.login(req.body)
//         .then((data) => {
//             res.status(data.status).send({ message: data.message });
//         })
//         .catch((err) => {
//             res.status(err.status).send({ message: err.message });
//         });
//
// });


route.post('/loginAdmin', (req, res) => {
    AdminController.login(req.body)
        .then((data) => {
            res.status(data.status).send(data.message);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        })
})

route.post('/', (req, res) => {
  AdminController.insert(req.body)
    .then(data => {
      res.status(data.status).send({ message: data.message });
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message });
    });
});

route.get('/', (req, res) => {
  AdminController.getAll()
    .then(data => {
      res.status(data.status).send(data.AdminList);
    })
    .catch(err => {
      res.status(err.status).send({ message: err.err });
    });
});
route.put('/:id', (req, res) => {
  AdminController.updateAdmin(req.params.id, req.body)
    .then(data => {
      res.status(data.status).send({ message: data.message });
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message });
    });
});

module.exports = route;
