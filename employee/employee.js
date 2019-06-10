let express                             = require('express');
let router                              = express.Router();
let mongoose                            = require('../DBSchema/DBConfig');
let employeeModel                       = mongoose.model('Employee');

// Get all employees
router.get('/', (req, res) => {
    employeeModel.find().then(data => {
        res.status(200).send(data).end();
    }).catch(err => {
        res.status(404).send(err).end();
    });
});

module.exports = router;