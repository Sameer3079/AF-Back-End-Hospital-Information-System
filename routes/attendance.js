let express                             = require('express');
let router                              = express.Router();
let mongoose                            = require('../DBSchema/DBConfig');
let attendanceModel                     = mongoose.model('Attendance');
let employeeModel                       = mongoose.model('Employee');
const ZERO_MS                           = ".000Z";

// Getting all attendance of all users
router.get('/', (req, res) => {
    attendanceModel.find().exec().then(data => {
        res.status(200).send(data).end();
    }).catch(err => {
        res.status(404).send(err).end();
    })
});

// Getting all attendance of a particular user
router.get('/:eId', (req, res) => {
    attendanceModel.find({ eId: req.body.eId }).exec().then(data => {
        res.status(200).send(data).end();
    }).catch(err => {
        res.status(404).send(err).end();
    })
});

// Getting attendance of all users in a period of time

// Record attendance - Impossible
router.post('/', (req, res) => {
    let employeeId = req.body.eId;
    employeeModel.find({ _id: employeeId }).then(data => {
        if (data.length === 0) {
            res.status(400).send({ message: "Employee does not exist" }).end();
        } else {
            let attendanceDocument = new attendanceModel({
                eId: req.body.eId,
                DateTimeIn: req.body.DateTimeIn + ZERO_MS,
                DateTimeOut: req.body.DateTimeOut + ZERO_MS,
            });
            attendanceDocument.save().then(() => {
                res.status(201).send({ message: "Attendance has been recorded" }).end();
            }).catch(err => {
                res.status(400).send({ message: "Failed to record attendance" }).end();
            })
        }
    })
});

// sign in
router.post('/signIn', (req, res) => {
    let employeeId = req.body.eId;
    employeeModel.find({ _id: employeeId }).then(data => {
        if (data.length === 0) {
            res.status(400).send({ message: "Employee does not exist" }).end();
        } else {
            let attendanceDocument = new attendanceModel({
                eId: req.body.eId,
                DateTimeIn: req.body.DateTimeIn + ZERO_MS,
            });
            attendanceDocument.save().then(savedDocument => {
                res.status(201).send({
                    message: "Sign in has been recorded",
                    _id: savedDocument._id
                }).end();
            }).catch(err => {
                res.status(400).send({ message: "Failed to record attendance" }).end();
            })
        }
    })
});

// sign out
// TODO: Make the sign out able to be done by the username instead of the attendance record id
router.put('/signOut/:id', (req, res) => {
    attendanceModel.findById({ _id: req.params.id }).then(attendanceRecord => {
        // if (data.length === 0) {
        //     res.status(400).send({
        //         message: "Could not find the attendace id",
        //         possibleCauses: "Not signed in or attendance id has been corrupted"
        //     }).end();
        // } else {
            attendanceRecord.DateTimeOut = req.body.DateTimeOut;
            attendanceModel.updateOne({ _id: req.params.id }, attendanceRecord).then(() => {
                res.status(201).send({ message: "Sign out has been recorded" }).end();
            }).catch(err => {
                res.status(400).send({ message: "Failed to record sign out" }).end();
            });
        // }
    });
});

module.exports = router;