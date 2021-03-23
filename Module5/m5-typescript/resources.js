"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRegList = exports.snackCourse = exports.paranthaCourse = exports.stringOfCourseRegs = exports.CourseReg = exports.Client = exports.Course = void 0;
var Course = /** @class */ (function () {
    function Course(name, dates) {
        this.courseName = name;
        this.courseDates = dates;
    }
    return Course;
}());
exports.Course = Course;
var Client = /** @class */ (function () {
    function Client(fname, lname, email) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
    }
    Client.prototype.stringVal = function () {
        return "{first name: " + this.fname + " last name: " + this.lname + " email: " + this.email + "}";
    };
    return Client;
}());
exports.Client = Client;
var CourseReg = /** @class */ (function () {
    function CourseReg(course, client, paid) {
        if (paid === void 0) { paid = false; }
        this.moneyPaid = false;
        this.course = course;
        this.client = client;
        this.moneyPaid = paid;
    }
    CourseReg.prototype.stringVal = function () {
        return this.client.stringVal() + "      Course: " + this.course.courseName;
    };
    return CourseReg;
}());
exports.CourseReg = CourseReg;
function stringOfCourseRegs(courseRegs) {
    var courseRegString = "";
    var index = 1;
    courseRegs.forEach(function (courseReg) {
        courseRegString = courseRegString + index + courseReg.stringVal() + "\n";
        index += 1;
    });
    return courseRegString;
}
exports.stringOfCourseRegs = stringOfCourseRegs;
//initialize some courses, clients, course-registrations
exports.paranthaCourse = new Course("Parantha making course", ["12/05/2020", "12/06/2020", "12/07/2020", "12/08/2020"]);
exports.snackCourse = new Course("Snack making course", ["12/06/2020", "12/07/2020", "12/08/2020", "12/09/2020"]);
var courseList = [exports.paranthaCourse, exports.snackCourse];
var client1 = new Client("Priyanka", "Kakria", "pkakria@uci.edu");
var client2 = new Client("Hemant", "Saggar", "hemantsaggar7@gmail.com");
var clientList = [client1, client2]; // list of clients
var courseReg1 = new CourseReg(exports.paranthaCourse, client1);
var courseReg2 = new CourseReg(exports.snackCourse, client1);
var courseReg3 = new CourseReg(exports.snackCourse, client2);
var courseReg4 = new CourseReg(exports.paranthaCourse, client2);
exports.courseRegList = [courseReg1, courseReg2, courseReg3, courseReg4]; // list of course registrations
//# sourceMappingURL=resources.js.map