import React, { Component } from "react";
import http from "./httpServiceAdminFaculty.js";
import auth from "./httpServiceAdminFacultyAuth.js";

class SheduleForm extends Component {
    state = {
        classForm: { course: "", time: "", endTime: "", topic: "", facultyName: auth.getUser().name },
        coursesByName: [],
        errors: {},
        edit: false,
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.classForm[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }
    async fetchData() {
        let user = auth.getUser();
        let response = await http.get(`/coursesbyfaculty/${user.name}`);
        let { data } = response;
        this.setState({ coursesByName: data })
    }
    async fetchData1() {
        let { id } = this.props.match.params;
        if (id) {
            let response = await http.get(`/classesByID/${id}`);
            let { data } = response;
            this.setState({ classForm: data, edit: true })
        } else {
            let newCourse = { course: "", time: "", endTime: "", topic: "", facultyName: auth.getUser().name };
            this.setState({ classForm: newCourse, edit: false })
        }
    }
    componentDidMount() {
        this.fetchData();
        this.fetchData1();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchData();
            this.fetchData1();
        }
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/welcome");
    }
    async putData(url, obj) {
        let response = await http.put(url, obj);
        let { data } = response;
        this.props.history.push("/allClassesFaculty");
    }
    hanldeSubmit = (e) => {
        e.preventDefault();
        let error = this.validateAll();
        let { classForm, edit } = this.state;
        if (this.isValid(error)) {
            alert("Details added successfully!");
            edit === true ? this.putData(`/classesById/${classForm.classId}`, classForm)
                : this.postData("/classes", classForm);
        } else {
            this.setState({ errors: error })
        }
    }

    isValid = (error) => {
        let keys = Object.keys(error);
        let count = keys.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0);
        return count === 0
    }

    validateAll = () => {
        let { time, endTime, topic } = this.state.classForm;
        let errors = {};
        errors.time = this.handleTime(time);
        errors.endTime = this.handleEndTime(endTime);
        errors.topic = this.handleTopic(topic);
        return errors;
    }

    handleTime = (time) => !time ? "Time is required" : "";
    handleEndTime = (endTime) => !endTime ? "EndTime is required" : "";
    handleTopic = (topic) => !topic ? "Topic is required" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        switch (input.name) {
            case "time": s1.errors.time = this.handleTime(input.value); break;
            case "endTime": s1.errors.endTime = this.handleEndTime(input.value); break;
            case "topic": s1.errors.time = this.handleTopic(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let { course, time, endTime, topic } = this.state.classForm;
        let { errors, coursesByName } = this.state;
        let uniqueCourseName = coursesByName.reduce((acc, curr) => {
            if (!acc.includes(curr.name)) {
                acc.push(curr.name)
            }
            return acc;
        }, []);
        console.log("Edit", this.state.classForm)
        return (
            <div className="container mt-4">
                <h2 className="mb-3">Schedule a Class</h2>

                <form>
                    <div className="form-group">
                        <select className="form-control" name="course" id="course" value={course} onChange={this.handleChange}>
                            <option value="">Select the Course</option>
                            {uniqueCourseName.map((ele) => (
                                <option key={ele} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>

                    <label className="form-group-label"> <b>Time</b><sup className="text-danger">*</sup></label>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="time"
                            id="time"
                            name="time"
                            value={time}
                            onChange={this.handleChange}
                            onBlur={this.handleFocusValidation}
                        />
                        {errors.time && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.time}</span>}
                    </div>

                    <label className="form-group-label"> <b>EndTime</b><sup className="text-danger">*</sup></label>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="time"
                            id="endTime"
                            name="endTime"
                            value={endTime}
                            onChange={this.handleChange}
                            onBlur={this.handleFocusValidation}
                        />
                        {errors.endTime && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.endTime}</span>}
                    </div>

                    <label className="form-group-label"> <b>Topic</b><sup className="text-danger">*</sup></label>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            id="topic"
                            name="topic"
                            value={topic}
                            onChange={this.handleChange}
                            onBlur={this.handleFocusValidation}
                        />
                        {errors.topic && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.topic}</span>}
                    </div>

                    <button className="btn btn-primary mt-3" onClick={this.hanldeSubmit}>Schedule</button>
                </form>
            </div>
        )
    }
}
export default SheduleForm;