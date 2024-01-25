import React, { Component } from "react";
import http from "./httpServiceAdminFaculty.js";
import auth from "./httpServiceAdminFacultyAuth.js";
class Left extends Component {
    state = {
        students: [],
    }
    async fetchData() {
        let response = await http.get("/uniqueCourses");
        let { data } = response;
        this.setState({ students: data });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let options = { ...this.props.options };
        options[input.name] = this.updateCBs(options[input.name], input.checked, input.value);
        this.props.onOptionChange(options);
    }

    updateCBs = (inpValues, checked, value) => {
        let newArr = inpValues ? inpValues.split(",") : [];
        if (checked) {
            newArr.push(value);
        } else {
            let index = newArr.findIndex((ele) => ele === value);
            if (index >= 0) {
                newArr.splice(index, 1);
            }
        }
        return newArr.join(",");
    }

    render() {
        let user = auth.getUser();
        let uniqueCourses = this.state.students.reduce((acc, curr) => {
            if (!acc.includes(curr)) {
                acc.push(curr);
            }
            return acc;
        }, []);
        const courses = this.props.options.courses || [];
        return (
            <div className="container bg-light mt-4">
                <label className="form-check-label mt-2"><b>Options</b></label><br />
                {uniqueCourses.map((opt) => (
                    <div className="form-check pt-4 pb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="courses"
                            value={opt}
                            checked={courses.includes(opt)}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label">{opt}</label><br />
                    </div>
                ))}
            </div>
        )
    }
}
export default Left;