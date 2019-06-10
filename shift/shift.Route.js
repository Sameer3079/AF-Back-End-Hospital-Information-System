let express                                         = require('express');
let router                                          = express.Router();
let mongoose                                        = require('../DBSchema/DBConfig');
let shiftModel                                      = mongoose.model('Shift');
let ShiftController                                 = require('./shift.Controller');

// Get all shifts
router.get('/', (req, res) => {
    ShiftController.GetAll().then(resolve => {
        res.send(resolve.data).end();
    }).catch(reject => {
        res.send(reject.error).end();
    })
});

// Add Shift Record
router.post('/', (req, res) => {
    ShiftController.Add(req.body.name, req.body.startTime, req.body.endTime).then(resolve => {
        res.status(200).send({ message: resolve.message }).end();
    }).catch(reject => {
        res.status(404).send(reject.error).end();
    });
});

router.put('/', (req, res) => {
    ShiftController.Update(req.body.name, req.body.startTime, req.body.endTime).then(resolve => {
        res.status(200).send({ message: resolve.message }).end();
    }).catch(reject => {
        res.status(404).send({ error: reject.error }).end();
    })
})

// Check Employee
router.get('/:username', (req, res) => {
    ShiftController.CheckEmployee(req.params.username).then(resolve => {
        res.send(resolve.data).end(); // TODO:
    }).catch(reject => {
        res.send(reject.error).end(); // TODO:
    })
});

module.exports = router;