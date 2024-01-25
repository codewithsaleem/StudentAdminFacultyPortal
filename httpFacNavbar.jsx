import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "./httpServiceAdminFacultyAuth.js";

class Navbar extends Component {
    render() {
        let views = ["All Students", "All Faculties"];
        let assigns = ["Student to Course", "Faculty to Course"];
        let det = ["Schedule a Class", "All Scheduled Classes"];

        let user = auth.getUser();
        return (
            <div className="container">
                <nav className="navbar navbar-expand-sm navbar-dark bg-success">
                    <Link to="/" className="navbar-brand ms-3">{user && user.role === "student" ? "Student Home" : (user && user.role === "faculty") ? "Faculty Home" : "Home"}</Link>

                    <ul className="navbar-nav mr-auto">
                        {user && user.role === "admin" && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                        Assign
                                    </a>
                                    <div className="dropdown-menu">
                                        {assigns.map((ele, index) => (
                                            <Link to={`/${ele}`} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                        View
                                    </a>
                                    <div className="dropdown-menu">
                                        {views.map((ele, index) => (
                                            <Link to={`/${ele}view?page=1`} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>
                            </React.Fragment>
                        )}

                        {user && user.role === "student" && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link to="/studentDetails" className="nav-link">Student details</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/allClasses" className="nav-link">All Classes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/allCourses" className="nav-link">All Courses</Link>
                                </li>
                            </React.Fragment>
                        )}

                        {user && user.role === "faculty" && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link to="/courses" className="nav-link">Courses</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                        Class Details
                                    </a>
                                    <div className="dropdown-menu">
                                        {det.map((ele, index) => (
                                            <Link to={index === 1 ? "/allClassesFaculty" : "/scheduleNewClass"} key={index} className="dropdown-item">{ele}</Link>
                                        ))}
                                    </div>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {!user && (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link me-3">Login</Link>
                            </li>
                        )}
                        {user && (
                            <React.Fragment>
                                <li className="nav-item">
                                    {user.role === "admin" && <b className="nav-link">Welcome Admin</b>}
                                    {user.role === "student" && <b className="nav-link">Welcome {user.name}</b>}
                                    {user.role === "faculty" && <b className="nav-link">Welcome {user.name}</b>}
                                </li>
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link me-3">Logout</Link>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </nav>
            </div>
        )
    }
}
export default Navbar;