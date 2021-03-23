import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import {Express, NextFunction, Request, Response} from "express";
const express = require("express");
//import * from resource_definitions;

class Course{
    courseName: string ;
    courseDates: string[] ;
    constructor(name: string, dates: string[]){
        this.courseName = name;
        this.courseDates = dates;
    }
}

class Client{
    fname: string| undefined;
    email: string| undefined;
    lname: string| undefined;

    constructor(fname: string, lname: string, email: string){
        this.fname = fname;
        this.lname = lname;
        this.email = email;
    }
    public stringVal(): string{
        return `{first name: ${this.fname} last name: ${this.lname} email: ${this.email}}`;
    }
}

class CourseReg{
    course: Course;
    client: Client;
    moneyPaid: boolean = false;
    constructor(course: Course, client: Client, paid: boolean = false){
        this.course = course;
        this.client = client;
        this.moneyPaid = paid;
    }

    public stringVal(): string{
        return this.client.stringVal() + "      Course: " + this.course.courseName;
    }
}

function stringOfCourseRegs(courseRegs: CourseReg[]): string {
    let courseRegString: string = "";
    let index: number = 1;
    courseRegs.forEach(courseReg => {
        courseRegString = courseRegString + index + courseReg.stringVal() + "\n";
        index += 1;
    });
    return courseRegString;
}

//initialize some courses, clients, course-registrations
let paranthaCourse = new Course("Parantha making course", ["12/05/2020", "12/06/2020", "12/07/2020", "12/08/2020"]);
let snackCourse = new Course("Snack making course", ["12/06/2020", "12/07/2020", "12/08/2020", "12/09/2020"]);
let courseList: Course[] = [paranthaCourse, snackCourse];

let client1 = new Client("Priyanka", "Kakria", "pkakria@uci.edu");
let client2 = new Client("Hemant", "Saggar", "hemantsaggar7@gmail.com");
let clientList: Client[] = [client1, client2]; // list of clients
let courseReg1 = new CourseReg(paranthaCourse, client1);
let courseReg2 = new CourseReg(snackCourse, client1);
let courseReg3 = new CourseReg(snackCourse, client2);
let courseReg4 = new CourseReg(paranthaCourse, client2);
let courseRegList: CourseReg[] = [courseReg1, courseReg2, courseReg3, courseReg4]; // list of course registrations

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
