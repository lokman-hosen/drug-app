import React from 'react'
import axios from "axios";
import Loading from "../loading";
import { NavLink, withRouter } from "react-router-dom";


class DrugDetail extends React.Component {
    state = {
        isLoading: true,

        name: '',
        category: '',
        drug:{}
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getGetById(id)
    }


    // get hospital by id and set values to state
    getGetById(drugId){
        axios.get('http://localhost:3005/api/v1/drug/'+drugId).then(response => {
            this.setState({
                drug: response.data.drug,
                //category: response.data.hospital.categoryName,
                //branchList: response.data.hospital.branches,
                isLoading: false,
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        const { drug} = this.state;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between">
                            <div><h4>Drug Detail</h4></div>
                            <div> <div className="text-end p-2"><a className="btn btn-info btn-sm" href="/drug"> Back</a></div></div>
                        </div>

                    </div>

                    {!this.state.isLoading ?
                        <div className="p-2">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={drug.image} className="mw-100"/>
                                        <div className="ps-2 mt-2">
                                            <p className="mb-1">Name: {drug.name}</p>
                                            <p className="mb-1">Price: {drug.price}</p>
                                            <p className="mb-0">Quantity: {drug.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Packet Size: {drug.packet_size}</li>
                                                <li className="list-group-item">Company: {drug.pharmaceutical}</li>
                                                <li className="list-group-item">Indications: {drug.indications}</li>
                                                <li className="list-group-item">Interaction: {drug.interaction}</li>
                                                <li className="list-group-item">Mode of action: {drug.mode_of_action}</li>
                                                <li className="list-group-item">Side effects: {drug.side_effects}</li>
                                                <li className="list-group-item">Storage: {drug.storage}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        : <Loading />}
                </div>

            </div>

        );
    }
}

export default DrugDetail