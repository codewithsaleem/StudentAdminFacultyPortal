import React, { Component } from "react";
import auth from "./httpServiceAdminFacultyAuth.js";

class Logout extends Component {
    componentDidMount(){
       auth.logout();
       window.location = "/login";
    }
    render() {
        return ""
    }
}
export default Logout;