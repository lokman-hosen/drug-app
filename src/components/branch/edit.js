import React from 'react'
import axios from "axios";
import Loading from "../loading";
import { NavLink, withRouter } from "react-router-dom";


class BranchEdit extends React.Component {
    state = {
        hospitalList: [],
        isLoading: false,

        id: '',
        name: '',
        hospital_id: '',
        address: '',
        contact_numbers: '',
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getBranchById(id)
        this.getHospitalList()
    }

    // get hospital list
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

    // get hospital branch by id and set values to state
    getBranchById(branchId){
        axios.get('http://localhost:3005/api/v1/institute/'+branchId).then(response => {
            this.setState({
                id: response.data.institute.id,
                name: response.data.institute.name,
                hospital_id: response.data.institute.hospital_id,
                address: response.data.institute.address,
                contact_numbers: response.data.institute.contact_numbers,
                isLoading: false,
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    // take value from form field and set to state
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    updateBranch = (e) =>{
        e.preventDefault();
        const { history} = this.props;
        //const id = this.props.match.params.id;

        axios.put('http://localhost:3005/api/v1/institute/'+this.state.id, {
            name: this.state.name,
            hospital_id: this.state.hospital_id,
            address: this.state.address,
            contact_numbers: this.state.contact_numbers,
        })
            .then(function (response) {
                history.push("/institute");
            })
            .catch(function (error) {
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
                                <div className="text-end"><a className="btn btn-info btn-sm" href="/institute">Back</a></div>
                                {!this.state.isLoading ?
                                    <form onSubmit={this.updateBranch}>

                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label"><span className="text-danger">*</span> Name</label>
                                            <input type="text" className="form-control" name="name" id="name"
                                                   value={this.state.name} onChange={this.handleInput}
                                                   placeholder="Enter Branch Name" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="hospitalId" className="form-label"><span className="text-danger">*</span> Select Hospital</label>
                                            <select className="form-select" name="hospital_id"
                                                    value={this.state.hospital_id} onChange={this.handleInput}
                                                    required>
                                                <option disabled>---Select---</option>
                                                {(hospitals.length > 0) &&
                                                    hospitals.map(hospital => (
                                                        <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                                                    )
                                                )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="contact_numbers" className="form-label"><span className="text-danger">*</span> Branch Contact Number</label>
                                            <input type="text" className="form-control" name="contact_numbers" id="contact_numbers"
                                                   value={this.state.contact_numbers} onChange={this.handleInput}
                                                   placeholder="Branch Contact Number" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label"><span className="text-danger">*</span> Address</label>
                                            <textarea className="form-control" name="address" id="address"
                                                      placeholder="Branch Address"
                                                      value={this.state.address}
                                                      onChange={this.handleInput}  required>{this.state.address}</textarea>
                                        </div>

                                        <div className="text-end">
                                            <button type="submit" className="btn btn-success btn-sm">Update</button>
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

export default withRouter(BranchEdit);