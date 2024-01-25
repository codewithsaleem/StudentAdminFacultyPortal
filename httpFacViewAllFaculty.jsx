import React, { Component } from "react";
import http from "./httpServiceAdminFaculty.js";
import auth from "./httpServiceAdminFacultyAuth.js";
import queryString from "query-string";
import Left from "./httpFacLeftCheckbox.jsx";
class ViewFaculty extends Component {
    state = {
        students: [],
        pageJSON: {}
    }
    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let searchStr = this.makeSearchString(queryParams);
        let response = null;
        if (searchStr) {
            response = await http.get(`/faculties?${searchStr}`);
        } else {
            response = await http.get("/faculties?page=1");
        }
        console.log("hi", response)
        let { data, pageInfo } = response.data;
        this.setState({ students: data, pageJSON: pageInfo });
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) this.fetchData();
    }

    handlePage = (num) => {
        let queryParams = queryString.parse(this.props.location.search);
        let { page = "1" } = queryParams;
        let newPage = +page + num;
        queryParams.page = newPage;
        this.callURL("/All Facultiesview", queryParams);
    }

    callURL = (url, options) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({
            pathname: url,
            search: searchStr,
        })
    }

    makeSearchString = (options) => {
        let { page, courses } = options;
        let searchStr = "";
        searchStr = this.addToQueryString(searchStr, "page", page);
        searchStr = this.addToQueryString(searchStr, "courses", courses);
        return searchStr;
    }

    addToQueryString = (str, paramName, paramValue) =>
        paramValue ? str ? `${str}&${paramName}=${paramValue}` : `${paramName}=${paramValue}` : str;

    handleOptionChange = (options) => {
        options.page = 1;
        this.callURL("/All Facultiesview", options);
    }

    render() {
        let user = auth.getUser();
        let { students } = this.state;
        let { pageNumber, numberOfPages, numOfItems, totalItemCount } = this.state.pageJSON;
        let queryParams = queryString.parse(this.props.location.search);

        // Calculate the start and end page numbers for the current range
        let size = 3;
        let startIndex = (pageNumber - 1) * size + 1;
        let endIndex;
        if (pageNumber * size > totalItemCount) {
            endIndex = totalItemCount;
        } else {
            endIndex = pageNumber * size;
        }

        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col-sm-3">
                        <Left options={queryParams} onOptionChange={this.handleOptionChange} />
                    </div>
                    <div className="col-sm-9">
                        <h2>All Faculties</h2>
                        <div className="row">
                            <h5>{startIndex} to {endIndex} of {totalItemCount}</h5>
                        </div>
                        <div className="row mb-2 mt-2">
                            <div className="col-sm-4"><b>Id</b></div>
                            <div className="col-sm-4"><b>Name</b></div>
                            <div className="col-sm-4"><b>Courses</b></div>
                        </div>
                        {students.map((ele) => (
                            <div className="row border bg-warning">
                                <div className="col-sm-4">{ele.id}</div>
                                <div className="col-sm-4">{ele.name}</div>
                                <div className="col-sm-4">{ele.courses.map((opt) => <React.Fragment key={opt}>{opt}<br /></React.Fragment>)}</div>
                            </div>
                        ))}
                        <div className="row mt-3">
                            <div className="col-sm-1">
                                {startIndex > 1 ? (<button className=" btn btn-sm btn-secondary mt-2" onClick={() => this.handlePage(-1)}>Prev</button>) : ""}
                            </div>
                            <div className="col-sm-10"></div>
                            <div className="col-sm-1">
                                {endIndex < totalItemCount ? (<button className=" btn btn-sm btn-secondary mt-2" onClick={() => this.handlePage(1)}>Next</button>) : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewFaculty;