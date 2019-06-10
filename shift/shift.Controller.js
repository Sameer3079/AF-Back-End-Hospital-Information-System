let mongoose                                    = require('../DBSchema/DBConfig');
let shiftModel                                  = mongoose.model('Shift');
let employeeModel                               = mongoose.model('Employee');

let ShiftController = function () {
    this.GetShiftByUsername = username => {
        return new Promise((resolve, reject) => {

        });
    }

    this.GetAll = () => {
        return new Promise((resolve, reject) => {
            shiftModel.find().then(data => {
                resolve({ data: data })
            }).catch(err => {
                reject({ error: err });
            })
        });
    }

    this.Add = (name, startTime, endTime) => {
        return new Promise((resolve, reject) => {
            let Shift = new shiftModel({
                name: name,
                startTime: startTime,
                endTime: endTime
            });
            Shift.save().then(() => {
                resolve({ message: "Successfully added Shift" });
            }).catch(err => {
                reject({ error: err });
            })
        })
    }

    this.Update = (name, startTime, endTime) => {
        return new Promise((resolve, reject) => {
            shiftModel.findOne({ name: name }).then(shift => {
                shift.startTime = startTime;
                shift.endTime = endTime;
                shift.save().then(() => {
                    resolve({ message: "Shift Updated" });
                }).catch(err => {
                    reject({ error: err });
                })
            }).catch(err => {
                reject({ error: err });
            })
        });
    }

    this.CheckEmployee = (username) => {
        employeeModel.findOne({ username: username }).then(Employee => {
            if (Employee === null) {
                reject();
            } else {
                if (Employee.shift === "Morning") {
                    // TODO: 
                } else if (Employee.shift === "Afternoon") {

                } else {

                }
            }
        })
    }
}

module.exports = new ShiftController();