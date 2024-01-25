import React, { Component } from "react";
import auth from "./httpServiceAdminFacultyAuth.js";
import http from "./httpServiceAdminFaculty.js";
class EditFaculty extends Component {
    state = {
        stud: [],
        formStud: { name: "", code: "", description: "", faculty: [] },
        edit: false,
    }
    async fetchData() {
        let response = await http.get("/courses");
        console.log("responses", response)
        let { data } = response;
        this.setState({ stud: data });
    }
    async fetchData1() {
        let { id } = this.props.match.params;
        let response = await http.get(`/coursesById/${id}`);
        let { data } = response;
        this.setState({ formStud: data, edit: true });
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

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        if (input.name === "faculty") {
            s1.formStud[input.name] = this.updateCBs(s1.formStud[input.name], input.checked, input.value);
        } else {
            s1.formStud[input.name] = input.value;
        }
        this.setState(s1);
    }

    updateCBs = (inpValues, checked, value) => {
        let newArr = inpValues ? [...inpValues] : [];
        if (checked) {
            newArr.push(value);
        } else {
            let index = newArr.findIndex((ele) => ele === value);
            if (index >= 0) {
                newArr.splice(index, 1);
            }
        }
        return newArr;
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/Faculty to Course")
    }

    async putData(url, obj) {
        let response = await http.put(url, obj);
        let { data } = response;
        this.props.history.push("/Faculty to Course")
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { formStud, edit } = this.state;
        edit === true ? this.putData(`/coursesPut/${formStud.courseId}`, formStud)
            : this.postData("/courses", formStud);
    }

    render() {
        let { stud, edit, formStud } = this.state;
        let { name, code, description, faculty } = this.state.formStud;
        let fnd = stud.map((ele) => ele.faculty)
        console.log("stud", formStud)

        const uniqueNames = fnd.reduce((acc, curr) => {
            curr.forEach(name => {
                if (!acc.includes(name)) {
                    acc.push(name);
                }
            });
            return acc;
        }, []);

        return (
            <div className="container mt-4">
                <h3 className="mt-3">Add faculty to a course</h3>
                <hr />
                <h2 className="mt-3">Edit the Courses</h2>
                <div className="form-group mt-3">
                    <label className="form-group-label"><b>Name</b><sup className="text-danger">*</sup></label>
                    <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="form-group-label"><b>Code</b><sup className="text-danger">*</sup></label>
                    <input
                        className="form-control"
                        type="text"
                        id="code"
                        name="code"
                        value={code}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group mt-3">
                    <label className="form-group-label"><b>Description</b><sup className="text-danger">*</sup></label>
                    <input
                        className="form-control"
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                    />
                </div>
                <label className="form-check-label mt-2"><b>Faculty</b><sup className="text-danger">*</sup></label><br />
                {uniqueNames.map((opt) => (
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="faculty"
                            value={opt}
                            checked={faculty.includes(opt)}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label">{opt}</label><br />
                    </div>
                ))}
                <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>UPDATE</button>
            </div>
        )
    }
}
export default EditFaculty;