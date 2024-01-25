import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./httpFacNavbar";
import Login from "./httpFacLogin";
import Logout from "./httpFacLogout";
import Welcome from "./httpFacWelcome";
import Register from "./httpFacRegister";
import Students from "./httpFacViewAllStudents";
import Courses from "./httpFacStudentsCourses";
import Faculty from "./httpFacFacultyCourses";
import ViewFaculty from "./httpFacViewAllFaculty";
import EditFaculty from "./httpFacEditFaculty";
import EditStudents from "./httpFacEditStudents";
import ByName from "./httpFacAllCoursesByName";
import ClassesByName from "./httpFacAllClassesByName";
import Form from "./httpFacStudentDetailsForm";
import ByNameFaculty from "./httpFacByNameFaculty";
import ClassesByNameFac from "./httpFacAllClassesByFaculty";
import SheduleForm from "./httpFacSheduleClassForm";
class MainFac extends Component {
    render() {
        return (
            <div className="container">
                <Navbar />

                <Switch>
                    <Route path="/editStudentCourses/:id" component={EditStudents} />
                    <Route path="/editFacultyCourses/:id" component={EditFaculty} />
                    <Route path="/studentDetails" component={Form} />
                    <Route path="/classes/:id/edit" component={SheduleForm} />
                    <Route path="/scheduleNewClass" component={SheduleForm} />
                    <Route path="/courses" component={ByNameFaculty} />
                    <Route path="/allClassesFaculty" component={ClassesByNameFac} />
                    <Route path="/allCourses" component={ByName} />
                    <Route path="/allClasses" component={ClassesByName} />
                    <Route path="/Faculty to Course" component={Faculty} />
                    <Route path="/Student to Course" component={Courses} />
                    <Route path="/All Studentsview" component={Students} />
                    <Route path="/All Facultiesview" component={ViewFaculty} />
                    <Route path="/register" component={Register} />
                    <Route path="/welcome" component={Welcome} />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        )
    }
}
export default MainFac;