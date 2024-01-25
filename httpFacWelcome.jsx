import React, {Component} from "react";
import auth from "./httpServiceAdminFacultyAuth.js";
class Welcome extends Component {
    render() {
        let user = auth.getUser();
        return(
            <div className="container text-center mt-4">
                {user.role === "admin" && <h2 className="text-warning">Welcome to Admin Dashboard</h2>}
                {user.role === "student" && <h2 className="text-warning">Welcome to Student Dashboard</h2>}
                {user.role === "faculty" && <h2 className="text-warning">Welcome to Faculty Dashboard</h2>}
            </div>
        )
    }
}
export default Welcome;