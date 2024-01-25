import React, { Component } from "react";
import auth from "./httpServiceAdminFacultyAuth.js";
import http from "./httpServiceAdminFaculty.js";
class ClassesByName extends Component {
    state = {
        coursesByName: [],
    }
    async fetchData() {
        let user = auth.getUser();
        let response = await http.get(`/classes/${user.name}`);
        let { data } = response;
        this.setState({ coursesByName: data })
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    render() {
        let { coursesByName } = this.state;
        let user = auth.getUser();
        return (
            <div className="container mt-4">
                <h2 className="mb-3">All Scheduled Classes</h2>

                {coursesByName.length > 0 ? (
                    <React.Fragment>
                        <div className="row p-3" style={{ backgroundColor: 'silver' }}>
                            <div className="col-sm-3"><b>Course Name</b></div>
                            <div className="col-sm-2"><b>Start Time</b></div>
                            <div className="col-sm-2"><b>End Time</b></div>
                            <div className="col-sm-2"><b>Faculty Name</b></div>
                            <div className="col-sm-3"><b>Component</b></div>
                        </div>
                        {coursesByName.map((ele) => (
                            <div className="row p-3 border" style={{ backgroundColor: 'lemonchiffon' }}>
                                <div className="col-sm-3">{ele.course}</div>
                                <div className="col-sm-2">{ele.time}</div>
                                <div className="col-sm-2">{ele.endTime}</div>
                                <div className="col-sm-2">{ele.facultyName}</div>
                                <div className="col-sm-3">{ele.topic}</div>
                            </div>
                        ))}
                    </React.Fragment>
                ) : <h4 className="text-danger">No Classes found to {user.name}</h4>}
            </div>
        )
    }
}
export default ClassesByName;