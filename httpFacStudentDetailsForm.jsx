import React, { Component } from "react";
import http from "./httpServiceAdminFaculty.js";
import auth from "./httpServiceAdminFacultyAuth.js";

class Form extends Component {
    state = {
        form: { name: auth.getUser().name, gender: "", dob: "", about: "", courses: [] },
        errors: {},
        edit: false,
        errorMsgs: "",
        years: ["1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005",
            "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"],
        months: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        dates: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
            "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
    }
    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.form[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async fetchData() {
        try {
            let user = auth.getUser();
            let response = await http.get(`/students/${user.name}`);
            let { data } = response;
            this.setState({ form: data })
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                this.setState({ errorMsgs: ex.response.data });
            }
        }
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    async postData(url, obj) {
        // Combine the selected date, month, and year into dob
        const { dob, month, year, ...rest } = obj;
        const combinedStayStartDate = `${dob}-${month}-${year}`;
        // Update the obj with the combined staystartdate 
        const updatedObj = { ...rest, dob: combinedStayStartDate };

        let response = await http.post(url, updatedObj);
        let { data } = response;
        this.props.history.push("/welcome");
    }
    hanldeSubmit = (e) => {
        e.preventDefault();
        let error = this.validateAll();
        let { form } = this.state;
        if (this.isValid(error)) {
            this.postData("/students", form);
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
        let { gender, dob } = this.state.form;
        let errors = {};
        errors.gender = this.handleGender(gender);
        errors.dob = this.handleDOB(dob);
        return errors;
    }

    handleGender = (gender) => !gender ? "Gender is required" : "";
    handleDOB = (dob) => !dob ? "DOB is required" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        switch (input.name) {
            case "gender": s1.errors.gender = this.handleGender(input.value); break;
            case "dob": s1.errors.dob = this.handleDOB(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let { gender, dob, about } = this.state.form;
        let { dates, months, years, errors, errorMsgs } = this.state;

        const dateParts = dob ? dob.split('-') : [];
        const selectedDate = dateParts[0];
        const selectedMonth = dateParts[1];
        const selectedYear = dateParts[2];

        return (
            <div className="container mt-4">
                <h2 className="mb-3">Student Details</h2>

                <div className="row mt-4">
                    <div className="col-sm-3"> <b>Gender</b><sup className="text-danger">*</sup></div>
                    <div className="col-sm-3">
                        <input class="form-check-input" type="radio" name="gender" id="gender" value="male" checked={gender === "male"} onChange={this.handleChange} />
                        <label class="form-check-label">Male</label>
                    </div>
                    <div className="col-sm-3">
                        <input class="form-check-input" type="radio" name="gender" id="gender" value="female" checked={gender === "female"} onChange={this.handleChange} />
                        <label class="form-check-label">Female</label>
                    </div>
                    {errors.gender && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.gender}</span>}
                </div>

                <div className="row mt-4">
                    <div className="col-sm-12"><b>Date of Birth</b> <sup className="text-danger">*</sup></div>
                </div>

                <div className="row">
                    <div className="col-sm-4">
                        <select
                            className="form-control"
                            type="text"
                            id="year"
                            name="year"
                            value={selectedYear}
                            onChange={this.handleChange}
                        >
                            <option value="">Select Year</option>
                            {years.map((ele, index) => (
                                <option key={index} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <select
                            className="form-control"
                            type="text"
                            id="month"
                            name="month"
                            value={selectedMonth}
                            onChange={this.handleChange}
                        >
                            <option value="">Select Month</option>
                            {months.map((ele, index) => (
                                <option key={index} value={ele}>{ele}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <select
                            className="form-control"
                            type="text"
                            id="dob"
                            name="dob"
                            value={selectedDate}
                            onChange={this.handleChange}
                        >
                            <option value="">Select Date</option>
                            {dates.map((ele, index) => (
                                <option key={index} value={ele}>{ele}</option>
                            ))}
                        </select>
                        {errors.dob && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.dob}</span>}
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-sm-12">
                        <label className="form-check-label"><b>About Myself</b></label>
                        <textarea
                            class="form-control"
                            id="about"
                            name="about"
                            value={about}
                            onChange={this.handleChange}
                            onBlur={this.handleFocusValidation}
                            rows="3">
                        </textarea>
                    </div>
                </div>

                {errorMsgs && <button className="btn btn-primary mt-3" onClick={this.hanldeSubmit}>Add Details</button>}
            </div>
        )
    }
}
export default Form;
