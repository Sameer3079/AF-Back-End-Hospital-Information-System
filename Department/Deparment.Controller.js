const Mongoose                      = require('../DBSchema/DBConfig');
const DepartmentSchema              = Mongoose.model("Department");

var DepartmentController = function() {

    /*
        Add new department
    */
    this.addNewDepartment = (Data) => {
        return new Promise((resolve, reject) => {

            /*
                Find department already exists, if it exists 
            */
            DepartmentSchema.find({ name: Data.name }).exec()
                .then((data) => {

                    if (data.length === 0) {

                        var Department = new DepartmentSchema({
                            name: Data.name,
                            buldingNumber: Data.buldingNumber,
                            depatmentHead: Data.depatmentHead,
                            departmentState: Data.departmentState
                        });

                        Department.save()
                            .then(() => {
                                resolve({ status: 200, message: "Added" });
                            })
                            .catch((err) => {
                                reject({ status: 500, message: err });
                            })

                    } else {

                        resolve({ status: 202, message: "Already Existing" });
                    }
                })

            .catch((err) => {
                reject({ status: 500, message: err })
            })
        })
    }

    /*
        Update department
    */

    this.Update = (id, data) => {
        return new Promise((resolve, reject) => {

            DepartmentSchema.find({ _id: id }).exec()
                .then((Data) => {
                    /*
                        Find matching department and if exists then it update
                    */
                    if (Data.length === 1) {
                        DepartmentSchema.update({ _id: id }, data)
                            .then((Data) => {
                                resolve({ status: 200, message: "Update Successfully" });
                            })
                            .catch((err) => {
                                reject({ status: 500, message: err });
                            });
                    } else {

                        resolve({ status: 202, message: "Department does not exist" });

                    }
                })
                .catch((err) => {
                    reject({ status: 500, message: err });
                })



        })
    }


    /*
        Get all department data 
    */
    this.getAll = () => {
        return new Promise((resolve, reject) => {
            DepartmentSchema.find().exec()
                .then((Data) => {
                    resolve({ status: 200, Data: Data });
                })
                .catch((err) => {
                    reject({ status: 500, message: err });
                });
        })
    }


    /*
        Delete a particular department.
    */

    this.Delete = (id) => {
        return new Promise((resolve, reject) => {


            DepartmentSchema.find({ _id: id }).exec()
                .then((data) => {
                    if (data.length === 1) {

                        DepartmentSchema.remove({ _id: id })
                            .then(() => {
                                resolve({ status: 200, message: "Delete Successfully" });
                            })
                            .catch((err) => {
                                reject({ status: 500, message: err });
                            })

                    } else {

                        resolve({ status: 200, message: "Department does not exist" });
                    }
                })
                .catch(() => {

                })



        })
    }



}

module.exports = new DepartmentController();