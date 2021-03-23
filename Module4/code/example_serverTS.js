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
var app = express(); // app express
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    console.log("got a request for " + req.path);
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
app.post("/registration_confirmation", function (req, res) {
    console.log("got a request for " + req.path);
    res.type("text/plain");
    //res.send("Thank you for registering. I received  " + req.body.class_name+ " " + req.body.fname + " " + req.body.lname + " " + req.body.email);
    //res.send("Still conected");
});
app.use("/images", express.static(path.join(__dirname, "static", "images"))); // serve all other static resources like images
app.get("/ListOfCourseRegistrations", function (req, res) {
    console.log("Client demanded list of course registrations");
    res.type('text/plain');
    res.send("Should work");
    //res.send(stringOfCourseRegs(courseRegList));
    res.end();
});
app.listen(8080, function () {
    console.log("listening on port 8080");
});
