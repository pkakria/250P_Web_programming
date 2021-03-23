"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var bodyparser = __importStar(require("body-parser"));
var express = require("express");
//import * from resource_definitions;
var Course = /** @class */ (function () {
    function Course(name, dates) {
        this.courseName = name;
        this.courseDates = dates;
    }
    return Course;
}());
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
function stringOfCourseRegs(courseRegs) {
    var courseRegString = "";
    var index = 1;
    courseRegs.forEach(function (courseReg) {
        courseRegString = courseRegString + index + courseReg.stringVal() + "\n";
        index += 1;
    });
    return courseRegString;
}
//initialize some courses, clients, course-registrations
var paranthaCourse = new Course("Parantha making course", ["12/05/2020", "12/06/2020", "12/07/2020", "12/08/2020"]);
var snackCourse = new Course("Snack making course", ["12/06/2020", "12/07/2020", "12/08/2020", "12/09/2020"]);
var courseList = [paranthaCourse, snackCourse];
var client1 = new Client("Priyanka", "Kakria", "pkakria@uci.edu");
var client2 = new Client("Hemant", "Saggar", "hemantsaggar7@gmail.com");
var clientList = [client1, client2]; // list of clients
var courseReg1 = new CourseReg(paranthaCourse, client1);
var courseReg2 = new CourseReg(snackCourse, client1);
var courseReg3 = new CourseReg(snackCourse, client2);
var courseReg4 = new CourseReg(paranthaCourse, client2);
var courseRegList = [courseReg1, courseReg2, courseReg3, courseReg4]; // list of course registrations
var app = express(); // app express
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    console.log("got a request for " + req.path);
    console.log("Hello there");
    //alert(`CourseRegSTring = ${stringOfCourseRegs(courseRegList)}`);
    fs.readFile(__dirname + '/static/mainpage.html', function (error, data) {
        res.type('html'); // set type to html
        res.send(data); // send main page
        // res.end();
    });
});
app.get("/register_classes.html", function (req, res) {
    console.log("got a request for " + req.path);
    fs.readFile(__dirname + '/static/register_classes.html', function (error, data) {
        res.type('html'); // set type to html
        res.send(data); // send main page
    });
});
//console.log(app.request.path);
app.post("/registration_confirmation", function (req, res) {
    console.log("in post");
    console.log("User sent a request firstname:" + req.body.fname + ", lastname:" + req.body.lname + ", email: " + req.body.email + ", date: " + req.body.class_date);
    res.type("text/plain"); // set type to plain
    res.send("Thank you. You have successfully registered for the class. Please use the back button to go back.");
    var newClient = new Client(req.body.fname, req.body.lname, req.body.email);
    var courseName = req.body.class_name;
    var newCourse;
    if (courseName.toLowerCase().includes("parantha")) {
        newCourse = paranthaCourse;
    }
    else {
        newCourse = snackCourse;
    }
    courseRegList.push(new CourseReg(newCourse, newClient));
});
app.use("/images", express.static(path.join(__dirname, "static", "images"))); // serve all other static resources like images
app.get("/ListOfCourseRegistrations", function (req, res) {
    console.log("Client demanded list of course registrations");
    res.type('text/plain');
    res.send(stringOfCourseRegs(courseRegList));
});
app.listen(8080, function () {
    console.log("listening on port 8080");
});
