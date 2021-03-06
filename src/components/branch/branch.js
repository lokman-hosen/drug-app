import React from 'react'
import axios from "axios";
import Loading from "../loading";
import AlertMessage from "../alertMessage";

class Branch extends React.Component {
    state = {
        instituteList: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true})

        this.getBranchList()

        //var self = this;
       /* axios.get('http://localhost:3005/api/v1/institute-list')
            .then(function (response) {
                if (response){
                    //console.log(response.data.instituteList)
                    const instituteList = response.data.instituteList;
                    //console.log(instituteList)
                    this.setState({
                        instituteList,
                    });
                }
            }).catch(function (error) {
                // handle error
                console.log(error);
            });*/
    }


    deleteItem = (id) => {
        axios.delete('http://localhost:3005/api/v1/institute/'+id)
            .then(function (response) {
                if (response){
                    window.location.reload();
                }
            }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    getBranchList(){

        axios.get('http://localhost:3005/api/v1/institute').then(response => {
            this.setState({
                instituteList:response.data.instituteList,
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        const instituteList =  this.state.instituteList;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Hospital Branch List</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                {!this.state.isLoading ?
                                    <div>
                                        <div className="text-end"><a className="btn btn-info btn-sm" href="/institute/create">+ Add New</a></div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Branch Name</th>
                                                <th scope="col">Hospital Name</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Contact</th>
                                                <th scope="col" className="action-column">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                instituteList.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.name}</td>
                                                        <td>{item.hospitalName}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.contact_numbers}</td>
                                                        <td>
                                                            <button className="btn btn-danger btn-sm me-1" type="button" onClick={() => this.deleteItem(item.id)}>Delete</button>
                                                            <a className="btn btn-success btn-sm" href={`/institute/${item.id}/edit`} role="button">Edit</a>
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

export default Branch;