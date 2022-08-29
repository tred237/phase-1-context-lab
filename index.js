function employeeRecord(){
    return {
        firstName: '',
        familyName: '',
        title: '',
        payPerHour: 0,
    }
};

const aggregateData = (arr) => arr.reduce((pv, cv) => pv + cv);

function createEmployeeRecord(empArray){
    const employee = employeeRecord()
    empArray.map((element, index) => employee[Object.keys(employee)[index]] = element);
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
}

function createEmployeeRecords(empArrays){
    return empArrays.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(timeIn) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(timeIn.split(' ')[1], 10),
        date: timeIn.split(' ')[0],
    });

    return this;
}

function createTimeOutEvent(timeOut) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(timeOut.split(' ')[1], 10),
        date: timeOut.split(' ')[0],
    });

    return this;
}

function createTimeArray(workedDate, eventType){
    const timeArray = [];

    this[eventType].map(element => {
        if(element.date === workedDate) timeArray.push(element);
    })
    return timeArray.sort((a, b) => a.hour - b.hour);
}

function hoursWorkedOnDate(workedDate){
    const timeIns = createTimeArray.call(this, workedDate, 'timeInEvents');
    const timeOuts = createTimeArray.call(this, workedDate, 'timeOutEvents');
    const hoursWorked = timeIns.map((element, index) => timeOuts[index].hour - element.hour);
    return aggregateData(hoursWorked)/100;
}

function wagesEarnedOnDate(workedDate){
    return this.payPerHour * hoursWorkedOnDate.call(this, workedDate)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.filter(element => element.firstName === firstName)[0]
}

function calculatePayroll(empRecords){
    const wages = empRecords.map(element => allWagesFor.call(element));
    return aggregateData(wages);
}