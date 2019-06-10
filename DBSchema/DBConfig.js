let mongoose = require('./config');
const Schema = mongoose.Schema;

// Common Models
let employeeModel = new Schema({
  username: { type: 'String', required: true },
  password: { type: 'String', required: true },
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  dob: { type: 'Date', required: true },
  gender: { type: 'String', required: true },
  civilStatus: { type: 'String', required: true },
  NIC: { type: 'String', required: true },
  address: { type: 'String', required: true },
  phone: { type: 'Number', required: true },
  email: { type: 'String', required: true },
  deleted: { type: 'Boolean', required: false },
  eType: { type: 'String', required: true }, // Employee Type - MLT/Nurse/...
  departments: { type: 'String', required: true }
});

let doctorModel = new Schema({
  username: { type: 'String', required: true },
  password: { type: 'String', required: true },
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  dob: { type: 'Date', required: true },
  gender: { type: 'String', required: true },
  civilStatus: { type: 'String', required: true },
  NIC: { type: 'String', required: true },
  address: { type: 'String', required: true },
  phone: { type: 'Number', required: true },
  email: { type: 'String', required: true },
  deleted: { type: 'Boolean', required: false },
  departments: [{ type: 'String', required: true }],
  specialization: { type: 'String', required: true }, // ***
  createdDateTime: { type: 'Date', required: false },
  shift: { type: 'String', required: false }
});

let adminModel = new Schema({
  username: { type: 'String', required: true },
  password: { type: 'String', required: true },
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  email: { type: 'String', required: true },
  createdDateTime: { type: 'Date', required: false }
});

// Attendance/Employee Shifts Records
let attendanceModel = new Schema({
  eId: { type: 'String', required: true },
  DateTimeIn: { type: 'Date', required: true },
  DateTimeOut: { type: 'Date', required: false }
});

// Contains information about the shifts (Start & End time)
let shiftModel = new Schema({
  name: { type: 'String', required: true },
  startTime: { type: 'String', required: true },
  endTime: { type: 'String', required: true }
});

// Contains the leave records
let leaveModel = new Schema({
  eId: { type: 'String', required: true },
  shiftLeaves: [
    { year: { type: 'Number', required: true } },
    { month: { type: 'Number', required: true } },
    { amount: { type: 'Number', required: true } }
  ]
});

// The amount of leaves each role of employee has per month
let assignedLeavesModel = new Schema({
  role: { type: 'String', required: true },
  shifts: { type: 'Number', required: true }
});

// Sachith - Department schema

var DeparmentSchema = new Schema({
  name: { type: 'String', required: true },
  buldingNumber: { type: 'String', required: true },
  depatmentHead: { type: 'String', required: true },
  departmentState: { type: String, required: true }
});

mongoose.model('Employee', employeeModel, 'employees');
mongoose.model('Attendance', attendanceModel, 'attendance');
mongoose.model('Shift', shiftModel, 'shifts');
mongoose.model('Admin', adminModel, 'admins');
mongoose.model('Doctor', doctorModel, 'doctors');
mongoose.model('Department', DeparmentSchema, 'departments');
mongoose.model('Leave', leaveModel, 'leaves');
mongoose.model('AssignedLeaves', assignedLeavesModel, 'assignedLeaves');

module.exports = mongoose;
