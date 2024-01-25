import React, { Component } from "react";
import http from "./httpServiceAdminFaculty.js";
import auth from "./httpServiceAdminFacultyAuth.js";
class Register extends Component {
    state = {
        registerForm: { name: "", email: "", password: "", confirmPassword: "", role: "" },
        errors: {},
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.registerForm[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async postData(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        this.props.history.push("/welcome");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let error = this.validateAll();
        let { registerForm } = this.state;
        if (this.isValid(error)) {
            // Check if password and password confirmation match
            if (registerForm.password !== registerForm.confirmPassword) {
                error.confirmPassword = "Passwords do not match";
            } else {
                alert("Registration Successfully!!")
                this.postData("/registerCustomer", registerForm)
            }
        } else {
            let s1 = { ...this.state };
            s1.errors = error;
            this.setState(s1);
        }

    }

    isValid = (error) => {
        let keys = Object.keys(error);
        let count = keys.reduce((acc, curr) => (error[curr] ? acc + 1 : acc), 0);
        return count === 0;
    }

    validateAll = () => {
        let { name, email, password, confirmPassword, role } = this.state.registerForm;
        let errors = {};
        errors.name = this.handleName(name);
        errors.role = this.handleRole(role);
        errors.email = this.handleEmail(email);
        errors.password = this.handlePassword(password);
        errors.confirmPassword = this.handleConfirmPassword(password, confirmPassword);
        return errors;
    }

    handleEmail = (email) => !email.includes("@") ? "Email is not valid" : "";
    handleRole = (role) => !role ? "Role is required" : "";
    handleName = (name) => !name ? "Name is required" : "";
    handlePassword = (password) => !password ? "Required" :
        password.length < 8 ||
            (!/[A-Z]/.test(password)) ||
            (!/[a-z]/.test(password)) ||
            (!/[0-9]/.test(password)) ?
            "Password should be Minimum 8 characters with a lowercase, uppercase, and digit" : "";
    handleConfirmPassword = (password, confirmPassword) => password !== confirmPassword ? "Password do not match" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };

        switch (input.name) {
            case "email": s1.errors.email = this.handleEmail(input.value); break;
            case "role": s1.errors.role = this.handleRole(input.value); break;
            case "name": s1.errors.name = this.handleName(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            case "confirmPassword": s1.errors.confirmPassword = this.handleConfirmPassword(s1.registerForm.password, input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let user = auth.getUser();
        let { name, email, password, confirmPassword, role } = this.state.registerForm;
        let { errors } = this.state;
        return (
            <div className="container mt-4 bg-light">
                <h2>Register</h2>

                <form>
                    <div className="form-group mt-2">
                        <label className="form-group-label"><b>Name</b><sup className="text-danger">*</sup></label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            placeholder="Enter your name"
                            onBlur={this.handleFocusValidation}
                        />
                        {errors.name && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.name}</span>}
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-group-label"><b>Password</b><sup className="text-danger">*</sup></label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            placeholder="Enter your password"
                            onBlur={this.handleFocusValidation}
                        />
                        {errors.password && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.password}</span>}
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-group-label"><b>Confirm Password</b><sup className="text-danger">*</sup></label>
                        <input
                            className="form-control"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={this.handleChange}
                            placeholder="Enter your confirm password"
                            onBlur={this.handleFocusValidation}
                        />
                        {errors.confirmPassword && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.confirmPassword}</span>}
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-group-label"><b>Email</b><sup className="text-danger">*</sup></label>
                        <input
                            className="form-control"
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            placeholder="Enter your email"
                            onBlur={this.handleFocusValidation}
                        />
                        {errors.email && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.email}</span>}
                    </div>

                    <label className="form-check-label"><b>Role</b><sup className="text-danger">*</sup></label><br />
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="student"
                            checked={role === "student"}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label"><b>Student</b></label>
                        <br />
                        <input
                            className="form-check-input"
                            type="radio"
                            name="role"
                            value="faculty"
                            checked={role === "faculty"}
                            onChange={this.handleChange}
                        />
                        <label className="form-check-label"><b>Faculty</b></label>
                        <br />
                    </div>

                    <button className="btn btn-primary mt-2" onClick={this.handleSubmit}>Register</button>
                </form>
            </div>
        )
    }
}
export default Register;