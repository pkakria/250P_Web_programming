import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import {Express, NextFunction, Request, Response} from "express";
const express = require("express");
import {Client, Course, CourseReg, paranthaCourse, snackCourse, courseRegList, stringOfCourseRegs} from "./resources";

const app: Express = express();// app express
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true})) 

app.get("/", (req: Request, res: Response ) =>{
    console.log("got a request for " + req.path);
    console.log("Hello there");
    //alert(`CourseRegSTring = ${stringOfCourseRegs(courseRegList)}`);
    fs.readFile(__dirname + '/static/mainpage.html', (error, data) =>{
        res.type('html'); // set type to html
        res.send(data); // send main page
       // res.end();
    })
});

app.get("/register_classes.html", (req: Request, res: Response ) =>{
    console.log("got a request for " + req.path);
    fs.readFile(__dirname + '/static/register_classes.html', (error, data) =>{
        res.type('html'); // set type to html
        res.send(data); // send main page
    })
  });

//console.log(app.request.path);
app.post("/registration_confirmation", (req: Request, res: Response) => {
    console.log("in post");
    console.log(`User sent a request firstname:${req.body.fname}, lastname:${req.body.lname}, email: ${req.body.email}, date: ${req.body.class_date}`);
    res.type("text/plain"); // set type to plain
    res.send("Thank you. You have successfully registered for the class. Please use the back button to go back.");
    let newClient : Client = new Client(req.body.fname, req.body.lname, req.body.email);
    let courseName : string = req.body.class_name;
    let newCourse: Course;
    if (courseName.toLowerCase().includes("parantha")){
        newCourse = paranthaCourse;
    }
    else{
        newCourse = snackCourse;
    }
    courseRegList.push(new CourseReg(newCourse, newClient));
})
app.use("/images", express.static(path.join(__dirname, "static", "images"))); // serve all other static resources like images

app.get("/ListOfCourseRegistrations", (req: Request, res: Response)=>{
console.log("Client demanded list of course registrations");
res.type('text/plain');
res.send(stringOfCourseRegs(courseRegList));
})
app.listen(8080, ()=>{
    console.log("listening on port 8080");
});
// #sourceMappingURL= m5server.js.map