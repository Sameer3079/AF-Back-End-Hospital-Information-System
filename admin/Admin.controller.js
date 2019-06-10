var mongoose                        = require('../DBSchema/DBConfig');
var AdminSchema                     = mongoose.model('Admin');


var AdminController = function() {

    this.login = (Data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.find({ username: Data.username, password: Data.password }).exec().then((data) => {
                    console.log(data);
                    if (data.length === 1) {
                        resolve({ status: 200, message: "Find User", });
                    } else {
                        resolve({ status: 202, message: "not Found" });
                    }
                })
                .catch((err) => {
                    reject({ status: 500, message: err });
                });
        });
    }

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            /*
            finding whether admin username already exists
            admin will be added only if username doesn't exist
            */
            AdminSchema.find({ username: data.username }).exec().then((data1) => {
                if (data1.length === 0) {
                    var admin = new AdminSchema({
                        username: data.username,
                        password: data.password,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email
                    });
                    console.log(admin.username);
                    admin.save()
                        .then(() => {
                            resolve({ status: 200, message: "Admin Added" });
                        }).catch((err) => {
                            reject({ status: 500, message: "Admin is Not Added " + err });
                        });
                } else {
                    resolve({ status: 200, message: "Admin Exists" });
                }
            })

        })
    }

    //getting all the Admins
    this.getAll = () => {
        return new Promise((resolve, reject) => {
            AdminSchema.find().exec()
                .then((data) => {
                    resolve({ status: 200, AdminList: data });
                }).catch((err) => {
                    resolve({ status: 500, message: err });
                });
        })
    }
    this.updateAdmin = (id, data) => {
        return new Promise((resolve, reject) => {
            AdminSchema.update({ id: id }, data).then(() => {
                resolve({ status: 200, message: "Admin Updated" });
            }).catch(() => {
                reject({ status: 500, message: err });
            });
        })
    }
}

//Deleting an Admin
this.Delete = (id) => {
    return new Promise((resolve, reject) => {


        AdminSchema.find({ _id: id }).exec()
            .then((data) => {
                if (data.length === 1) {

                    AdminSchema.remove({ _id: id })
                        .then(() => {
                            resolve({ status: 200, message: "Deleted Successfully" });
                        })
                        .catch((err) => {
                            reject({ status: 500, message: err });
                        })

                } else {

                    resolve({ status: 200, message: "Admin doesn't exist" });
                }
            })
            .catch((err) => {
                reject({ status: 500, message: err })
            })
    })
}

module.exports = new AdminController();