// Your code here
/*
I need to build a time card and payroll application.
using data map/reduce methods.
store data in objects in separate functions.
*/
//const [name, lastName, title, payRate]  = employeeObject
function createEmployeeRecord(employeeObject){
const [name, lastName, title, payRate]  = employeeObject 
const employee = {
    firstName:employeeObject[0],
    familyName: employeeObject[1],
    title: employeeObject[2],
    payPerHour: employeeObject[3],
    timeInEvents: [],
    timeOutEvents: []
}
return employee
}

function createEmployeeRecords(arrayOfEmployeeObject){
    return arrayOfEmployeeObject.map(x => createEmployeeRecord(x))
    //       or 
    // let records = Array;
    // for(var employeeObject in arrayOfEmployeeObject){
    //     records.push(createEmployeeRecord(employeeObject));
    // }
    // return records;
}
function createTimeInEvent(employeeRecord,dateStamp){
const [date, time] = dateStamp.split(" ");
const hour = parseInt(time, 10);
employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour,
    date
})
   return employeeRecord
}
function createTimeOutEvent(employeeRecord, dateStamp){
    const[date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour
    });
    return employeeRecord
}
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((event)=>event.date === date);

    if (timeIn && timeOut) {
        const hoursWorked = (timeOut.hour - timeIn.hour)/100;
        return hoursWorked
    }
    //else hours worked = 0 
return 0;
}
function wagesEarnedOnDate(employeeRecord, date){
    const totalHoursOnDate = hoursWorkedOnDate(employeeRecord, date)
    const payOwed = employeeRecord.payPerHour * totalHoursOnDate
    return payOwed
}
function allWagesFor(employeeRecord){
    const workDates = employeeRecord.timeInEvents.map((event)=>event.date);
    const wagesTotal = workDates.reduce((total, date)=>{
        return total + wagesEarnedOnDate(employeeRecord, date);
}, 0);
return wagesTotal;
}
function calculatePayroll (employees){
       return employees.reduce((totalPayRoll, employeeRecord)=> {
        return totalPayRoll + allWagesFor(employeeRecord);
    },0);

}