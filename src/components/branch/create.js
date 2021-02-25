import React from 'react'
import axios from "axios";
import Loading from "../loading";

class BranchCreate extends React.Component {
    state = {
        hospitalList: [],
        isLoading: false
    }

    componentDidMount() {
         this.getHospitalList()
    }

    getHospitalList(){
        this.setState({ isLoading: true})
        axios.get('http://localhost:3005/api/v1/hospital-list').then(response => {
            this.setState({
                hospitalList:response.data.hospitalList,
                isLoading: false,
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        var hospitals = this.state.hospitalList;
        return (
            <div className="container">

                <div className="card">
                    <div className="card-header">Create Hospital Branch</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="text-end"><a className="btn btn-info btn-sm" href="">Back</a></div>
                                {!this.state.isLoading ?
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Hospital</label>
                                            <select className="form-select" aria-label="Default select example">
                                                <option selected>Select</option>
                                                {(hospitals.length > 0) &&
                                                    hospitals.map(hospital => (
                                                        <option value="1">{hospital.name}</option>
                                                    )
                                                )
                                                }

                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                            <label className="form-check-label" htmlFor="exampleCheck1">Check me
                                                out</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                                    </form>

                                    : <Loading />}


                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default BranchCreate;