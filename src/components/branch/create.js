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
        const hospitals = this.state.hospitalList;
        return (
            <div className="container">

                <div className="card">
                    <div className="card-header">Create Hospital Branch</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="text-end"><a className="btn btn-info btn-sm" href="/branch">Back</a></div>
                                {!this.state.isLoading ?
                                    <form>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label"><span className="text-danger">*</span> Name</label>
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Enter Branch Name" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label"><span className="text-danger">*</span> Select Hospital</label>
                                            <select className="form-select" name="hospital_id" required>
                                                <option selected>Select</option>
                                                {(hospitals.length > 0) &&
                                                    hospitals.map(hospital => (
                                                        <option key={hospital.id} value="1">{hospital.name}</option>
                                                    )
                                                )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="contact_numbers" className="form-label"><span className="text-danger">*</span> Branch Contact Number</label>
                                            <input type="text" className="form-control" name="contact_numbers" id="contact_numbers" placeholder="Branch Contact Number" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label"><span className="text-danger">*</span> Address</label>
                                            <textarea type="text" className="form-control" name="address" id="address" placeholder="Branch Address" required></textarea>
                                        </div>

                                        <div className="text-end">
                                            <button type="submit" className="btn btn-success btn-sm">Submit</button>
                                        </div>
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