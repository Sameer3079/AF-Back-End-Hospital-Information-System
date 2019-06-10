const express                           = require('express');
const route                             = express.Router();
const DoctorController                  = require('./Doctor.controller');


route.post('/loginDoctor', (req, res) => {
    DoctorController.login(req.body)
        .then((data) => {
            res.status(data.status).send(data.message);
        })
        .catch((err) => {
            res.status(err.status).send(err.message);
        })
})

route.post('/',(req,res)=>{
    DoctorController.insert(req.body)
    .then((data)=>{
        res.status(data.status).send({message:data.message})
    }).catch((err)=>{
        res.status(err.status).send({message:err.message})
    })
});

route.get('/', (req, res) => {
    DoctorController.getAll()
    .then((data) => {
        res.status(data.status).send(data.DoctorList);
    })
    .catch((err) => {
        res.status(err.status).send({message:err.err});
    });
});
route.put('/:id', (req, res) => {
    DoctorController.updateDoctor(req.params.id, req.body)
    .then((data) => {
        res.status(data.status).send({message:data.message});
    })
    .catch((err) => {
        res.status(err.status).send({message:err.message});
    });
})

module.exports = route;