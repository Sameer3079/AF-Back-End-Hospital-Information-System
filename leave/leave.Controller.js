let mongoose                                    = require('../DBSchema/DBConfig');
let leaveModel                                  = mongoose.model('Leave');
let assignedLeavesModel                         = mongoose.model('AssignedLeaves');

let LeaveController = function () {

    this.GetAll = () => {
        return new Promise((resolve, reject) => {
            assignedLeavesModel.find().then(data => {
                resolve({ status: 200, data: data });
            }).catch(err => {
                reject({ status: 404, error: err });
            })
        })
    }

    this.GetByRole = (role) => {
        return new Promise((resolve, reject) => {
            assignedLeavesModel.findOne({ role: role }).then(leave => {
                if (leave !== null)
                    resolve({ leaveAmount: leave.shifts, status: 200 });
                else
                    reject({ message: "Record does not exist", status: 404 });
            }).catch(err => {
                reject({ message: "Error getting record", error: err, status: 404 });
            });
        });
    }

    this.Add = (role, shifts) => {
        return new Promise((resolve, reject) => {
            assignedLeavesModel.find({ role: role }).then(data => {
                if (data.length === 0) { //ADD
                    let Leave = new assignedLeavesModel({
                        role: role,
                        shifts: shifts
                    });
                    Leave.save().then(() => {
                        resolve({ message: "Added leave", status: 201 });
                    }).catch(err => {
                        reject({ message: "Failed to add leave", status: 404, error: err });
                    })
                } else { // UPDATE
                    let Leave = data[0];
                    Leave.role = role;
                    Leave.shifts = shifts;
                    Leave.save().then(() => {
                        resolve({ message: "Updated leave", status: 201 });
                    }).catch(err => {
                        reject({ message: "Failed to update leave", status: 404, error: err });
                    })
                }
            }).catch(err => {
                reject({ message: "Failed to check whether the record already exists", status: 404, error: err });
            })
        })
    }
}

module.exports = new LeaveController;