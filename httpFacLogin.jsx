import React, { Component } from "react";
import http from "./httpServiceAdminFaculty.js";
import auth from "./httpServiceAdminFacultyAuth.js";
class Login extends Component {
    state = {
        loginForm: { email: "", password: "" },
        errors: {}
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.loginForm[input.name] = input.value;
        this.handleFocusValidation(e);
        this.setState(s1);
    }

    async postData(url, obj) {
        try {
            let response = await http.post(url, obj);
            let { data } = response;
            auth.login(data);
            window.location = "/welcome";
        } catch (ex) {
            if (ex.response && ex.response.status === 401) {
                this.setState({ errorMsgs: ex.response.data });
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { loginForm } = this.state;
        let error = this.validateAll();
        if (this.isValid(error)) {
            this.postData("/login", loginForm);
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
        let { email, password } = this.state.loginForm;
        let errors = {};
        errors.email = this.hanldeEmail(email);
        errors.password = this.handlePassword(password);
        return errors;
    }

    hanldeEmail = (email) => !email ? "Email is required" : "";
    handlePassword = (password) => password.length < 7 ? "Password is must of atleast 7 characters" : "";

    handleFocusValidation = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        switch (input.name) {
            case "email": s1.errors.email = this.hanldeEmail(input.value); break;
            case "password": s1.errors.password = this.handlePassword(input.value); break;
            default: break;
        }
        this.setState(s1);
    }

    render() {
        let { email, password } = this.state.loginForm;
        let { errors, errorMsgs } = this.state;
        console.log("err", errorMsgs)
        return (
            <div className="container mt-5 text-center">
                <form>
                    {errorMsgs && <span className="text-danger">{errorMsgs}</span>}
                    <h2>Login</h2>
                    <div className="row mt-4">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-2"><b>Email <sup className="text-danger">*</sup></b></div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter your email"
                                    onChange={this.handleChange}
                                    onBlur={this.handleFocusValidation}
                                />
                                <span>We'll never share your email with anyone else</span><br />
                                {errors.email && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.email}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-2"><b>Password <sup className="text-danger">*</sup></b></div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    onChange={this.handleChange}
                                    onBlur={this.handleFocusValidation}
                                />
                                {errors.password && <span className="text-danger form-control border" style={{ backgroundColor: 'pink' }}>{errors.password}</span>}
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>Login</button>
                </form>
            </div>
        )
    }
}
export default Login;