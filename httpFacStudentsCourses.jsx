import React, { Component } from "react";
import auth from "./httpServiceAdminFacultyAuth.js";
import http from "./httpServiceAdminFaculty.js";
class Courses extends Component {
    state = {
        courses: []
    }
    async fetchData() {
        let response = await http.get("/courses");
        let { data } = response;
        this.setState({ courses: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handleEdit = (id) => {
        this.props.history.push(`/editStudentCourses/${id}`)
    }
    render() {
        let { courses } = this.state;
        return (
            <div className="container mt-4">
                <h2>Add students to a course</h2>

                <div className="row mb-2 mt-2">
                    <div className="col-sm-1"><b>CourseId</b></div>
                    <div className="col-sm-2"><b>Name</b></div>
                    <div className="col-sm-2"><b>Course Code</b></div>
                    <div className="col-sm-4"><b>Description</b></div>
                    <div className="col-sm-2"><b>Students Name</b></div>
                    <div className="col-sm-1"></div>
                </div>
                {courses.map((ele) => (
                    <div className="row border bg-warning">
                        <div className="col-sm-1">{ele.courseId}</div>
                        <div className="col-sm-2">{ele.name}</div>
                        <div className="col-sm-2">{ele.code}</div>
                        <div className="col-sm-4">{ele.description}</div>
                        <div className="col-sm-2">{ele.students.map((opt) => <React.Fragment key={opt}>{opt}<br /></React.Fragment>)}</div>
                        <div className="col-sm-1">
                            <button className="btn-sm btn-secondary m-2" onClick={() => this.handleEdit(ele.courseId)}>Edit</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default Courses;