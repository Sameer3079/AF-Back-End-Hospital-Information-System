let express                             = require('express');
let router                              = express.Router();
let LeaveController                     = require('./leave.Controller');

// Get all leave records
router.get('/', (req, res) => {
    LeaveController.GetAll().then(resolve => {
        res.status(resolve.status).send(resolve.data).end();
    }).catch(reject => {
        res.status(reject.status).send(reject.error).end();
    });
});

// Get leave amount for a role
router.get('/:role', (req, res) => {
    LeaveController.GetByRole(req.params.role).then(resolve => {
        res.status(resolve.status).send({leaveAmount: resolve.leaveAmount}).end();
    }).catch(reject => {
        res.status(reject.status).send({error: reject.error, message: reject.message}).end();
    });
});

// Assign fixed leave time for a role
// If a record exists update it
// else add a new record
router.put('/', (req, res) => {
    LeaveController.Add(req.body.role, req.body.shifts).then(resolve => {
        res.status(resolve.status).send({message: resolve.message}).end();
    }).catch(reject => {
        res.status(reject.status).send({error: reject.error, message: reject.message}).end();
    });
});

module.exports = router;