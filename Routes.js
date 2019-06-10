const Express                               = require('express');
const Routes                                = Express.Router();
const EmployeeRoute                         = require('./Employee/Employee.Route');
const DoctorRoute                           = require('./Doctor/Doctor.Route');
const AdminRoute                            = require('./Admin/Admin.Route');
const AttendanceRoute                       = require('./attendance/attendance.Route')
const LeaveRoute                            = require('./leave/leave.Route');
const ShiftRoute                            = require('./shift/shift.Route');
const DepatmentRoute                        = require('./Department/Deparment.Route');

Routes.use('/employee',EmployeeRoute);
Routes.use('/department',DepatmentRoute);
Routes.use('/doctor',DoctorRoute);
Routes.use('/admin',AdminRoute);
Routes.use('/attendance', AttendanceRoute);
Routes.use('/leaves', LeaveRoute);
Routes.use('/shifts', ShiftRoute);

module.exports  = Routes;