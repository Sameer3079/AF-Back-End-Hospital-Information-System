let mongoose                                = require('../DBSchema/DBConfig');
let attendanceModel                         = mongoose.model('Attendance');
let employeeModel                           = mongoose.model('Employee');
let leaveModel                              = mongoose.model('Leave');

const ZERO_MS                               = ".000Z";

let AttendanceController = function () {
    this.GetAll = () => {
        return new Promise((resolve, reject) => {
            attendanceModel.find().then((data) => {
                resolve({ data: data });
            }).catch((err) => {
                reject({ error: err });
            });
        });
    }

    this.GetById = (id) => {
        return new Promise((resolve, reject) => {
            attendanceModel.find({ eId: id }).then(data => {
                resolve({ data: data });
            }).catch(err => {
                reject({ error: err });
            });
        });
    }

    this.GetByUsername = (username) => {
        return new Promise((resolve, reject) => {
            employeeModel.findOne({ username: username }).then(employeeRecord => {
                this.GetById(employeeRecord._id).then(innerResolve => {
                    resolve({ data: innerResolve.data });
                }).catch(innerReject => {
                    reject({ error: innerReject.error });
                })
            }).catch(err => {
                reject({ error: err });
            });
        });
    }

    this.GetAttendanceBetween = (startDateTime, endDateTime) => {
        return new Promise((resolve, reject) => {
            start = new Date(startDateTime);
            end = new Date(endDateTime);
            attendanceModel.find({ DateTimeIn: { $gte: start, $lt: end } }).then(data => { // TODO: less than
                resolve({ data: data });
            }).catch(err => {
                reject({ error: err });
            });
        });
    }

    this.BetweenAbsent = (startDateTime, endDateTime) => {
        return new Promise((resolve, reject) => {
            this.GetAttendanceBetween(startDateTime, endDateTime).then(innerResolve => {
                let data = innerResolve.data;
                let presentList = [];
                data.forEach(record => { // Getting the present id list
                    presentList.push(record.eId);
                });
                employeeModel.find().then(empData => {
                    let totalList = [];
                    empData.forEach(empRecord => {
                        totalList.push(empRecord._id);
                    });
                    let absentList = this.arr_diff(presentList,totalList);
                    resolve({absentList: absentList});
                }).catch(err => {
                    reject({error: err});
                })
            }).catch(innerReject => {
                reject({error: innerReject.error});
            })
        })
    }

    this.arr_diff = (a1, a2) => {

        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    }

    this.StartShift = (username, dateTimeIn) => {
        return new Promise((resolve, reject) => {
            employeeModel.find({ username: username }).then(data => {
                if (data.length === 0) {
                    reject({ message: "Employee does not exist", status: 400 });
                } else {
                    let id = data[0]._id;
                    let attendanceDocument = new attendanceModel({
                        eId: id,
                        DateTimeIn: dateTimeIn,
                    });
                    attendanceDocument.save().then(() => {
                        resolve({ message: "Shift start time recorded", status: 200 });
                    }).catch(err => {
                        reject({ message: "Failed to record shift start time", error: err, status: 401 });
                    });
                }
            }).catch(err => {
                // TODO:
            });
        });
    }

    this.EndShift = (username, dateTimeOut) => {
        return new Promise((resolve, reject) => {
            employeeModel.find({ username: username }).then(data => {
                if (data.length === 0) {
                    reject({ message: "Invalid username", status: 400 });
                } else {
                    let id = data[0]._id;
                    attendanceModel.findOne({ eId: id, DateTimeOut: null }).then(attendanceRecord => {
                        attendanceRecord.DateTimeOut = dateTimeOut;
                        attendanceRecord.save().then(() => {
                            resolve({ message: "Shift end time recorded", status: 200 });
                        }).catch(err => {
                            reject({ message: "Failed to record shift end time", status: 500, error: err });
                        });
                    }).catch(err => {
                        reject({ message: "Failed to record shift end time", status: 500, error: err });
                    });
                }
            }).catch(err => {
                reject({ message: "Failed to record shift end time", status: 500, error: err });
            });
        });
    }

    this.CheckUser = username => {
        return new Promise((resolve, reject) => {
            //TODO: 
            today = new Date();
            let month = today.getMonth() + 1; // month ranges from 0 to 11
            let year = today.getFullYear();
            employeeModel.findOne({ username: username }).then(user => {
                if (user === null) {
                    reject({ error: "User does not exist" });
                } else {
                    let id = user._id;
                    console.log(id);
                    leaveModel.findOne({ eId: id }).then(data => {
                        let shiftLeaves = data.shiftLeaves;
                        let amount = null;
                        shiftLeaves.array.forEach(monthlyRecord => {
                            if (monthlyRecord.year === year && monthlyRecord.month === month) {
                                amount = monthlyRecord.amount;
                            }
                        });
                        if (amount === null) {
                            console.log("NULL");
                            reject({ error: "Null" });
                        } else {
                            resolve(amount);
                        }
                    }).catch(err => {
                        reject({ error: "Finding Leave Failed" });
                    })
                }
            }).catch(err => {
                reject({ error: "Finding Employee Failed" });
            })
        });
    }
}

module.exports = new AttendanceController;