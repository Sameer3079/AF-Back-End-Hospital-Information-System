var mongoose                                = require('../DBSchema/DBConfig');
var Employeeschema                          = mongoose.model('Employee');

var EmployeeController=function(){

    this.login = (Data) => {
        return new Promise((resolve, reject) => {
            Employeeschema.find({ username: Data.username, password: Data.password}).exec().then((data1) => {
                console.log(data1);
                if(data1.length === 1){
                    resolve({status:200, message:"Find Employee", });
                }
                else{
                    resolve({status:202, message:"not Found"});
                }
            })
                .catch((err) => {
                    reject({status:500, message:err});
                });
        });
    }
    this.insert = (data)=>{
        return new Promise((resolve,reject)=>{
            /*
            finding whether employee username already exists
            employee will be added only if username doesn't exist
            */
           Employeeschema.find({username:data.username}).exec().then((data1)=>{
               if(data1.length === 0){
            var Employee = new Employeeschema({
                username:data.username,
                password:data.password,
                firstName:data.firstName,
                lastName:data.lastName,
                dob:data.dob,
                gender:data.gender,
                civilStatus:data.civilStatus,
                NIC:data.NIC,
                address:data.address,
                phone:data.phone,
                email:data.email,
                deleted:data.deleted,
                eType:data.eType,
                departments:data.departments
            });

            Employee.save()
            .then(()=>{
                resolve({status:200, message:"Employee Added"});
            }).catch((err)=>{
                reject({status:500, message:"Employee is Not Added" +err});
            });
        }else{
            resolve({status:200, message:"Already Exists"});
        }
        })
        
        })
    }

    //getting all the employees
    this.getAll = ()=>{
        return new Promise((resolve,reject)=>{
            Employeeschema.find().exec()
            .then((data)=>{
                resolve({status:200, EmployeeList:data});
            }).catch((err)=>{
                resolve({status:500, message:err});
            });
        })
    }
    this.updateEmployee = (id,data) =>{
        return new Promise((resolve,reject)=>{
            Employeeschema.update({id:id},data).then(()=>{
                resolve({status:200 , message:"Employee Updated"});
            }).catch(()=>{
                reject({status:500 , message:err});
            });
        })
    }
}

//Deleting an employee
this.Delete = (id) => {
    return new Promise((resolve,reject) => {

        
        Employeeschema.find({_id:id}).exec()
        .then((data) => {
            if(data.length === 1){

                Employeeschema.remove({_id:id})
                .then(() => {
                    resolve({status:200, message:"Deleted Successfully"});
                })
                .catch((err) => {
                     reject({status:500, message:err});
                })

            }
            else{

                resolve({status:200, message:"Employee doesn't exist"});
            }
        })
        .catch((err) => {
            reject({status:500, message:err})
        })  
    })
}

module.exports = new EmployeeController;