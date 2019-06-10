let express                                 = require('express');
let router                                  = express.Router();
let AttendanceController                    = require('./attendance.Controller');

// Getting all attendance of all users
router.get('/', (req, res) => {
    AttendanceController.GetAll().then(resolve => {
        res.status(200).send(resolve.data).end();
    }).catch(reject => {
        res.status(404).send(reject.error).end();
    });
});

// Getting all attendance of a particular user
router.get('/user/:username', (req, res) => {
    AttendanceController.GetByUsername(req.params.username).then(resolve => {
        res.status(200).send(resolve.data).end();
    }).catch(reject => {
        res.status(404).send(reject.error).end();
    });
});

// Getting attendance in a period of time
router.post('/between', (req, res) => {
    AttendanceController.GetAttendanceBetween(req.body.startDateTime, req.body.endDateTime).then(resolve => {
        res.status(200).send({ data: resolve.data }).end();
    }).catch(reject => {
        res.status(404).send({ error: reject.error }).end();
    });
});

router.post('/between-absent', (req, res) =>{
    AttendanceController.BetweenAbsent(req.body.startDateTime, req.body.endDateTime).then(resolve => {
        res.status(200).send({ data: resolve.absentList }).end();
    }).catch(reject => {
        res.status(404).send({ error: reject.error }).end();
    });
})

// Start Shift
router.post('/start-shift', (req, res) => {
    AttendanceController.StartShift(req.body.username, req.body.dateTimeIn).then(resolve => {
        res.status(resolve.status).send({ message: resolve.message }).end();
    }).catch(reject => {
        res.status(reject.status).send({ message: reject.message, error: reject.error }).end();
    });
});

// End Shift
router.put('/end-shift', (req, res) => {
    AttendanceController.EndShift(req.body.username, req.body.dateTimeOut).then(resolve => {
        res.status(resolve.status).send({ message: resolve.message }).end()
    }).catch(reject => {
        res.status(reject.status).send({ error: reject.error }).end();
    });
});

// Check user shifts and leaves
router.get('/check-user/:username', (req, res) => {
    // res.send("Checking username: " + req.params.username);
    AttendanceController.CheckUser(req.params.username).then(resolve => {
        res.status(200).send(resolve).end();
    }).catch(reject => {
        res.status(404).send({ error: reject.error }).end();
    });
});

module.exports = router;