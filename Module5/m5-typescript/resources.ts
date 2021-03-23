    export class Course{
        courseName: string ;
        courseDates: string[] ;
        constructor(name: string, dates: string[]){
            this.courseName = name;
            this.courseDates = dates;
        }
    }
    
    export class Client{
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
    
    export class CourseReg{
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
    
    export function stringOfCourseRegs(courseRegs: CourseReg[]): string {
        let courseRegString: string = "";
        let index: number = 1;
        courseRegs.forEach(courseReg => {
            courseRegString = courseRegString + index + courseReg.stringVal() + "\n";
            index += 1;
        });
        return courseRegString;
    }
    
    //initialize some courses, clients, course-registrations
    export let paranthaCourse = new Course("Parantha making course", ["12/05/2020", "12/06/2020", "12/07/2020", "12/08/2020"]);
    export let snackCourse = new Course("Snack making course", ["12/06/2020", "12/07/2020", "12/08/2020", "12/09/2020"]);
    let courseList: Course[] = [paranthaCourse, snackCourse];
    
    let client1 = new Client("Priyanka", "Kakria", "pkakria@uci.edu");
    let client2 = new Client("Hemant", "Saggar", "hemantsaggar7@gmail.com");
    let clientList: Client[] = [client1, client2]; // list of clients
    let courseReg1 = new CourseReg(paranthaCourse, client1);
    let courseReg2 = new CourseReg(snackCourse, client1);
    let courseReg3 = new CourseReg(snackCourse, client2);
    let courseReg4 = new CourseReg(paranthaCourse, client2);
    export let courseRegList: CourseReg[] = [courseReg1, courseReg2, courseReg3, courseReg4]; // list of course registrations