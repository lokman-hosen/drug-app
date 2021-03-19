import React from 'react'
import axios from "axios";
import Loading from "../loading";
import { NavLink, withRouter } from "react-router-dom";


class HospitalDetail extends React.Component {
    state = {
        isLoading: true,

        name: '',
        category: '',
        branchList:[],
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getHospitalById(id)
    }


    // get hospital by id and set values to state
    getHospitalById(hospitalId){
        axios.get('http://localhost:3005/api/v1/hospital/'+hospitalId).then(response => {
            this.setState({
                name: response.data.hospital.name,
                category: response.data.hospital.categoryName,
                branchList: response.data.hospital.branches,
                isLoading: false,
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        const branchList = this.state.branchList;

        return (
            <div className="container">

                <div className="card">
                    <div className="card-header">Hospital Detail</div>
                    <div className="row">
                        <div className="col-12">
                            <div className="text-end p-2"><a className="btn btn-info btn-sm" href="/hospital"> Back</a></div>
                        </div>
                    </div>

                    {!this.state.isLoading ?
                        <div className="p-2">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Name: {this.state.name}</li>
                                <li className="list-group-item">Category: {this.state.category}</li>
                            </ul>
                            <h3 className="text-center mb-0">Branches</h3>
                            <hr/>

                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Branch Name</th>
                                    <th scope="col">Hospital Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Phone</th>
                                </tr>
                                </thead>
                                <tbody>
                                {branchList.length > 0 ?
                                    branchList.map((item, index) => (
                                        <tr key={item.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{item.hospitalName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.contact_numbers}</td>
                                        </tr>
                                    ))
                                    : <tr> <td colSpan={6}><p className="text-center mb-0">No Data Found</p></td></tr>}

                                </tbody>
                            </table>
                        </div>
                        : <Loading />}
                </div>

            </div>

        );
    }
}

export default HospitalDetail