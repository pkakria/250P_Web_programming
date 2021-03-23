import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import {Express, NextFunction, Request, Response} from "express";
const express = require("express");

const app: Express = express();// app express
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true})) 

app.get("/", (req: Request, res: Response ) =>{
    console.log("got a request for " + req.path);
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

app.post("/registration_confirmation", (req: Request, res: Response ) =>{
  console.log("got a request for " + req.path);
  res.type("text/plain");
  //res.send("Thank you for registering. I received  " + req.body.class_name+ " " + req.body.fname + " " + req.body.lname + " " + req.body.email);
  //res.send("Still conected");
});


app.use("/images", express.static(path.join(__dirname, "static", "images"))); // serve all other static resources like images

app.get("/ListOfCourseRegistrations", (req: Request, res: Response)=>{
console.log("Client demanded list of course registrations");
res.type('text/plain');
res.send("Should work");
//res.send(stringOfCourseRegs(courseRegList));
res.end();
})

app.listen(8080, ()=>{
    console.log("listening on port 8080");
});
