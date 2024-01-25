import React, { Component } from "react";
import auth from "./httpServiceAdminFacultyAuth.js";
import http from "./httpServiceAdminFaculty.js";
class ByNameFaculty extends Component {
    state = {
        coursesByName: [],
    }
    async fetchData() {
        let user = auth.getUser();
        let response = await http.get(`/coursesbyfaculty/${user.name}`);
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
                <h2 className="mb-3">Courses Assigned</h2>

                {coursesByName.length > 0 ? (
                    <React.Fragment>
                        <div className="row p-3" style={{ backgroundColor: 'silver' }}>
                            <div className="col-sm-2"><b>CourseId</b></div>
                            <div className="col-sm-3"><b>Course Name</b></div>
                            <div className="col-sm-3"><b>Course Code</b></div>
                            <div className="col-sm-4"><b>Description</b></div>
                        </div>
                        {coursesByName.map((ele) => (
                            <div className="row p-3 border" style={{ backgroundColor: 'darkseagreen' }}>
                                <div className="col-sm-2">{ele.courseId}</div>
                                <div className="col-sm-3">{ele.name}</div>
                                <div className="col-sm-3">{ele.code}</div>
                                <div className="col-sm-4">{ele.description}</div>
                            </div>
                        ))}
                    </React.Fragment>
                ) : <h4 className="text-danger">No Courses found to {user.name}</h4>}
            </div>
        )
    }
}
export default ByNameFaculty;