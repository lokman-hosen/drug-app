import React from 'react'
import axios from "axios";
import Loading from "../loading";

class Advertisement extends React.Component {
    state = {
        advertisementList: [],
        isLoading: false
    }

    componentDidMount() {
        this.setState({ isLoading: true})
        this.getAdList()
    }


    getAdList(){
        axios.get('http://localhost:3005/api/v1/ad-load').then(response => {
            this.setState({
                advertisementList:response.data.data,
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        const advertisementList =  this.state.advertisementList;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Hospital Hospital List</div>
                    <div className="card-body">
                        <div >
                            {!this.state.isLoading ?
                                <div className="row">
                                    {
                                        advertisementList.map((advertisement, index) => (
                                        <div className="col-md-4 col-sm-6"  key={advertisement.id}>
                                            <div className="card">
                                            <img src={advertisement.image} className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                            <h5 className="card-title">{advertisement.title}</h5>
                                            <p className="card-text">Some quick example text to build on the card title
                                            and make up the bulk of the card's content.</p>
                                            <a href={advertisement.source_url} className="btn btn-primary">Go somewhere</a>
                                            </div>
                                            </div>

                                        </div>
                                        ))
                                    }

                                </div>
                                : <Loading />
                            }

                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Advertisement;