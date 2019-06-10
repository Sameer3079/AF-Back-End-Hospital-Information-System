const express                               = require('express');
const route                                 = express.Router();
const EmployeeController                    = require('./Employee.controller');

route.post('/loginEmployee', (req, res) => {
    EmployeeController.login(req.body)
        .then((data) => {
            res.status(data.status).send(data.message);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        })
})

route.post('/',(req,res)=>{
    EmployeeController.insert(req.body)
    .then((data)=>{
        res.status(data.status).send({message:data.message})
    }).catch((err)=>{
        res.status(err.status).send({message:err.message})
    })
});

route.get('/', (req, res) => {
    EmployeeController.getAll()
    .then((data) => {
        res.status(data.status).send(data.EmployeeList);
    })
    .catch((err) => {
        res.status(err.status).send({message:err.err});
    });
});
route.put('/:id', (req, res) => {
    EmployeeController.updateEmployee(req.params.id, req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message});
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message});
    });
})

module.exports = route;