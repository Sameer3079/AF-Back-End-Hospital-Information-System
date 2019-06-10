var mongoose                                = require('../DBSchema/DBConfig');
var Doctorschema                            = mongoose.model('Doctor');

var DoctorController=function(){

    this.login = (Data) => {
        return new Promise((resolve, reject) => {
            Doctorschema.find({ username: Data.username, password: Data.password}).exec().then((data1) => {
                console.log(data1);
                if(data1.length === 1){
                    resolve({status:200, message:"Find Doctor", });
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

//add new doctor
    this.insert = (data)=>{
        return new Promise((resolve,reject)=>{
            /*
            finding whether doctor username already exists
            doctor will be added only if username doesn't exist
            */
            Doctorschema.find({username:data.username}).exec().then((data1)=>{
                if(data1.length === 0){
            var Doctor = new Doctorschema({
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
                departments:data.departments,
                specialization:data.specialization
            });

            Doctor.save()
            .then(()=>{
                resolve({status:200, message:"Doctor Added"});
            }).catch((err)=>{
                reject({status:500, message:"Doctor is Not Added" + err});
            });
        }else{
            resolve({status:200, message:"Already Existing"});
        }
        }).catch((err)=>{
            reject({status:500,message:err});
        })
        
        })
    }

//getting all the doctors
    this.getAll = ()=>{
        return new Promise((resolve,reject)=>{
            Doctorschema.find().exec()
            .then((data)=>{
                resolve({status:200, DoctorList:data});
            }).catch((err)=>{
                resolve({status:500, message:err});
            });
        })
    }

    //updating doctor details
    this.updateDoctor = (id,data) =>{
        return new Promise((resolve,reject)=>{
            Doctorschema.update({id:id},data).then(()=>{
                resolve({status:200 , message:"Doctor Updated"});
            }).catch((err)=>{
                reject({status:500 , message:err});
            });
        })
    }
}
this.Delete = (id) => {
    return new Promise((resolve,reject) => {

        Doctorschema.find({_id:id}).exec()
        .then((data) => {
            if(data.length === 1){

                Doctorschema.remove({_id:id})
                .then(() => {
                    resolve({status:200, message:"Deleted Successfully"});
                })
                .catch((err) => {
                     reject({status:500, message:err});
                })

            }
            else{

                resolve({status:200, message:"Doctor details doesn't exist"});
            }
        })
        .catch((err) => {
            reject({status:500, message:err});
        })
    })
}

module.exports = new DoctorController;