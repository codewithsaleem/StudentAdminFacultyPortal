var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    next();
});

var port = process.env.PORT || 2450;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

//data :-------------------------
customers = [
    {
        custId: 1,
        name: "ABC",
        password: "abc1234",
        role: "admin",
        email: "abc@gmail.com"
    },
    {
        custId: 2,
        name: "Willie",
        password: "willie1234",
        role: "student",
        email: "willie@gmail.com"
    },
    {
        custId: 3,
        name: "Jack",
        password: "jack1234",
        role: "faculty",
        email: "jack@gmail.com"
    },
    {
        custId: 4,
        name: "James",
        password: "james1234",
        role: "student",
        email: "james@gmail.com"
    },
    {
        custId: 5,
        name: "Harry",
        password: "harry1234",
        role: "faculty",
        email: "harry@gmail.com"
    },
    {
        custId: 6,
        name: "Tia",
        password: "tia1234",
        role: "student",
        email: "tia@gmail.com"
    },
    {
        custId: 7,
        name: "Aditya",
        password: "aditya123",
        role: "faculty",
        email: "aditya@gmail.com"
    },
    {
        custId: 8,
        name: "Sonu",
        password: "sonu1234",
        role: "student",
        email: "sonu@gmail.com"
    },
    {
        custId: 9,
        name: "Ellie",
        password: "ellie1234",
        role: "student",
        email: "ellie@gmail.com"
    },
    {
        custId: 10,
        name: "Gia",
        password: "gia1234",
        role: "faculty",
        email: "gia@gmail.com"
    }
];
courses = [
    {
        courseId: 1,
        name: "ANGULAR",
        code: "ANG97",
        description: "All fundamentals of Angular 7",
        faculty: ["Daniel", "Jack"],
        students: ["Sam"]
    },
    {
        courseId: 2,
        name: "JAVASCRIPT",
        code: "JS124",
        description: "Intoduction to javascript",
        faculty: ["Aditya"],
        students: ["James", "Joy", "Monu", "Rita"]
    },
    {
        courseId: 3,
        name: "REACT",
        code: "RCT56",
        description: "React Javascript library",
        faculty: ["Jack", "Gia"],
        students: ["Raima", "Rita", "Sonu", "James"]
    },
    {
        courseId: 4,
        name: "BOOTSTRAP",
        code: "BS297",
        description: "Bootstrap Designing Framework",
        faculty: [],
        students: ["James", "Tia", "Ellie"]
    },
    {
        courseId: 5,
        name: "CSS",
        code: "CS365",
        description: "Basic stylesheet language",
        faculty: [],
        students: ["James", "Rita", "Monica"]
    },
    {
        courseId: 6,
        name: "REST AND MICROSERVICES",
        code: "RM392",
        description: "Introduction to Microservices",
        faculty: [],
        students: ["Sam"]
    },
    {
        courseId: 7,
        name: "NODE",
        code: "ND725",
        description: "Introduction to Node",
        faculty: ["Sonia"],
        students: ["Saransh", "Shrey", "Monica"]
    }
];
faculties = [
    { id: 5, name: "Daniel", courses: ["ANGULAR", "CSS"] },
    { id: 4, name: "Sonia", courses: ["NODE", "JAVASCRIPT"] },
    { id: 3, name: "Jack", courses: ["REACT", "ANGULAR"] },
    { id: 2, name: "Gia", courses: ["REACT"] },
    { id: 1, name: "Aditya", courses: ["ANGULAR"] }
];
classes = [
    {
        classId: 1,
        course: "REACT",
        time: "07:45",
        endTime: "08:45",
        topic: "Redux",
        facultyName: "Jack"
    },
    {
        classId: 2,
        course: "ANGULAR",
        time: "15:45",
        endTime: "17:40",
        topic: "Component",
        facultyName: "Jack"
    },
    {
        classId: 3,
        course: "JAVASCRIPT",
        time: "15:45",
        endTime: "17:40",
        topic: "Component",
        facultyName: "Aditya"
    }
];
students = [
    {
        id: 16,
        name: "Willie",
        dob: "31-July-1997",
        gender: "male",
        about: "Pursuing Graduation",
        courses: ["ANGULAR", "NODE"]
    },
    {
        id: 15,
        name: "Tia",
        dob: "30-July-1997",
        gender: "male",
        about: "Pursuing Graduation",
        courses: []
    },
    {
        id: 14,
        name: "Apoorv",
        dob: "31-August-1998",
        gender: "male",
        about: "Want to learn new technologies",
        courses: []
    },
    {
        id: 13,
        name: "Joy",
        dob: "31-July-1997",
        gender: "male",
        about: "Pursuing Graduation",
        courses: ["JAVASCRIPT"]
    },
    {
        id: 12,
        name: "Rachel",
        dob: "31-August-1998",
        gender: "female",
        about: "Pursuing Graduation",
        courses: []
    },
    {
        id: 11,
        name: "Monica",
        dob: "30-July-1997",
        gender: "female",
        about: "Want to learn new technologies",
        courses: ["CSS", "NODE"]
    },
    {
        id: 10,
        name: "Monu",
        dob: "12-May-1997",
        gender: "male",
        about: "Pursuing Graduation",
        courses: ["JAVASCRIPT"]
    },
    {
        id: 9,
        name: "Sonu",
        dob: "12-May-1997",
        gender: "male",
        about: "Pursuing Graduation",
        courses: ["REACT"]
    },
    {
        id: 8,
        name: "Raima",
        dob: "30-July-1997",
        gender: "female",
        about: "Want to learn new technologies",
        courses: ["REACT"]
    },
    {
        id: 7,
        name: "Rita",
        dob: "31-August-1998",
        gender: "female",
        about: "Pursuing Graduation",
        courses: ["JAVASCRIPT", "REACT", "CSS"]
    },
    {
        id: 6,
        name: "Shrey",
        dob: "12-May-1997",
        gender: "male",
        about: "Pursuing Graduation",
        courses: ["NODE"]
    },
    {
        id: 5,
        name: "Saransh",
        dob: "31-July-1997",
        gender: "male",
        about: "Want to learn new technologies",
        courses: ["NODE"]
    },
    {
        id: 4,
        name: "Sanya",
        dob: "31-July-1997",
        gender: "male",
        about: "Want to learn new technologies",
        courses: []
    },
    {
        id: 3,
        name: "James",
        dob: "12-July-1994",
        gender: "male",
        about: "Pursuing Graduation",
        courses: ["JAVASCRIPT", "BOOTSTRAP", "CSS", "REACT"]
    },
    {
        id: 2,
        name: "Sam",
        dob: "12-July-1994",
        gender: "male",
        about: "Pursuing Graduation",
        courses: ["ANGULAR", "REST AND MICROSERVICES"]
    },
    {
        id: 1,
        name: "Ellie",
        dob: "12-June-1992",
        gender: "female",
        about: "Want to learn new technologies",
        courses: ["BOOTSTRAP"]
    }
];
uniqueCourses = ["ANGULAR", "JAVASCRIPT", "REACT", "BOOTSTRAP", "CSS", "REST AND MICROSERVICES", "NODE"];

//url for login:-----
app.post("/login", function (req, res) {
    let body = { email: req.body.email, password: req.body.password };
    console.log(body)
    let obj = customers.find(
        (obj) => obj.email === body.email && obj.password === body.password
    );
    if (obj === undefined) res.status(401).send("Login Failed!! Check the username and password");
    else {
        res.send(obj);
    }
})

//url for register:----
app.post("/registerCustomer", function (req, res) {
    let body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    let custObj = { custId: customers.length + 1, ...body };
    customers.push(custObj);
    res.send(body);
})

//url for customers:----
app.get("/customers", function (req, res) {
    res.send(customers);
})

//url for customers:----
app.get("/uniqueCourses", function (req, res) {
    res.send(uniqueCourses);
})

//url for customers:----
app.get("/getStud", function (req, res) {
    res.send(students);
})

//url for courses:----
app.get("/courses", function (req, res) {
    res.send(courses);
})
app.get("/courses/:username", function (req, res) {
    let username = req.params.username;
    let coursesForUser = courses.filter((course) => course.students.includes(username));
    res.send(coursesForUser);
});
app.get("/coursesbyfaculty/:username", function (req, res) {
    let username = req.params.username;
    let coursesForUser = courses.filter((course) => course.faculty.includes(username));
    res.send(coursesForUser);
});
app.get("/coursesById/:courseId", function (req, res) {
    let id = +req.params.courseId;
    let courseObj = courses.find((ele) => ele.courseId === id);
    res.send(courseObj);
})
app.post("/courses", function (req, res) {
    let body = req.body;

    let updateCustomer = { ...body };
    courses.push(updateCustomer);
    res.send(updateCustomer);
});
app.put("/coursesPut/:courseId", function (req, res) {
    let id = req.params.courseId;
    let body = req.body;
    let index = courses.findIndex((ele) => ele.courseId === body.courseId);

    if (index >= 0) {
        let updateCourse = { courseId: body.courseId, ...body };
        courses[index] = updateCourse;
        res.send(updateCourse);
    } else {
        res.status(404).send("No course found with the given courseId");
    }
});




//url for classes:----
app.get("/classes/:username", function (req, res) {
    let username = req.params.username;
    let coursesForUser = classes.filter((name) => name.facultyName === username);
    res.send(coursesForUser);
});
app.get("/classesByID/:id", function (req, res) {
    console.log("id")
    let id = +req.params.id;
    let courseForUser = classes.find((ele) => ele.classId === id);
    if (courseForUser) {
        res.send(courseForUser);
    } else {
        res.status(404).send("Class not found");
    }
});
app.put("/classesById/:id", function (req, res) {
    let id = +req.params.id;
    let body = req.body;
    let index = classes.findIndex((ele) => ele.classId === id);

    if (index >= 0) {
        let updateCourse = { classId: id, ...body };
        classes[index] = updateCourse;
        res.send(updateCourse);
    } else {
        res.status(404).send("No class found");
    }
});
app.get("/classes", function (req, res) {
    res.send(classes);
});
app.post("/classes", function (req, res) {
    let body = req.body;

    let updateCustomer = { courseId: classes.length + 1, ...body };
    classes.push(updateCustomer);
    res.send(updateCustomer);
});



//url for students:----
app.get("/students/:username", function (req, res) {
    let username = req.params.username;
    let fnd = students.find((ele) => ele.name === username);
    if (fnd) res.send(fnd);
    else res.status(404).send("Not found");
})

//url for students:----
app.post("/students", function (req, res) {
    let body = req.body;
    let updateStudents = { courseId: students.length + 1, ...body };
    students.unshift(updateStudents);
    res.send(updateStudents);
})

//url for students:----
app.get("/students", function (req, res) {
    let dispArr = [];
    students.map((obj) => {
        let obj1 = { ...obj };
        dispArr.push(obj1);
    });

    let courses = req.query.courses;
    let arr = dispArr;
    if (courses) {
        const selectedCourses = courses.split(','); // Split the courses into an array
        arr = arr.filter((ele) => selectedCourses.some(course => ele.courses.includes(course)))
    }

    let page = +req.query.page;
    page = isNaN(page) ? 1 : page;
    //have to add pagination
    let respArr = pagination(arr, page);
    let len = arr.length;
    let quo = Math.floor(len / 3);
    let rem = len % 3;
    let extra = rem === 0 ? 0 : 1;
    let numofpages = quo + extra;
    let pageInfo = {
        pageNumber: page,
        numberOfPages: numofpages,
        numOfItems: 3,
        totalItemCount: arr.length,
    };
    res.json({
        data: respArr,
        pageInfo: pageInfo,
    });
})
//url for faculties:----
app.get("/faculties", function (req, res) {
    let dispArr = [];
    faculties.map((obj) => {
        let obj1 = { ...obj };
        dispArr.push(obj1);
    });

    let courses = req.query.courses;
    let arr = dispArr;
    if (courses) {
        const selectedCourses = courses.split(','); // Split the courses into an array
        arr = arr.filter((ele) => selectedCourses.some(course => ele.courses.includes(course)))
    }

    let page = +req.query.page;
    page = isNaN(page) ? 1 : page;
    //have to add pagination
    let respArr = pagination(arr, page);
    let len = arr.length;
    let quo = Math.floor(len / 3);
    let rem = len % 3;
    let extra = rem === 0 ? 0 : 1;
    let numofpages = quo + extra;
    let pageInfo = {
        pageNumber: page,
        numberOfPages: numofpages,
        numOfItems: 3,
        totalItemCount: arr.length,
    };
    res.json({
        data: respArr,
        pageInfo: pageInfo,
    });
})
function pagination(obj, page) {
    var resArr = obj;
    resArr = resArr.slice(page * 3 - 3, page * 3);
    return resArr;
}