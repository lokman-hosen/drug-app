import React from 'react'
import axios from "axios";
import Loading from "../loading";

class Hospital extends React.Component {
    state = {
        hospitalList: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true})
        this.getHospitalList()
    }


    getHospitalList(){
        axios.get('http://localhost:3005/api/v1/hospital').then(response => {
            this.setState({
                hospitalList:response.data.hospitalList,
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        const hospitalList =  this.state.hospitalList;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Hospital Hospital List</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                {!this.state.isLoading ?
                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Hospital Name</th>
                                                <th scope="col">Category</th>
                                                <th scope="col" className="action-column">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                hospitalList.map((hospital, index) => (
                                                    <tr key={hospital.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{hospital.name}</td>
                                                        <td>{hospital.categoryName}</td>
                                                        <td>
                                                            <a className="btn btn-success btn-sm" href={`/hospital/${hospital.id}`} role="button">View</a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                            </tbody>
                                        </table>
                                    </div>
                                    : <Loading />
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Hospital;