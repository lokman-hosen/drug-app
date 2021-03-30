import React from 'react'
import axios from "axios";
import Loading from "../loading";
import MyPagination from "react-js-pagination";

class Drug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drugList: [],
            isLoading: false,
            sizePerPage: 5,
            totalRecord: 0,
            activePage: 1
        };
    }

    componentDidMount() {

        this.setState({ isLoading: true})
        this.getDrugList()
    }


    getDrugList(){
        const pageNumber =this.state.activePage;
        axios.get('http://localhost:3005/api/v1/drug?page='+pageNumber).then(response => {
            this.setState({
                drugList:response.data.drugList,
                totalRecord:response.data.totalItem,
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    handlePageChange(pageNumber) {

       // console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
        setTimeout(() => {
                this.getDrugList()
        }, 100);

    }

    render() {
        const { drugList, totalRecord, activePage} = this.state;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Drug List</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                {!this.state.isLoading ?
                                    <div>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Category</th>
                                                <th scope="col">Company</th>
                                                <th scope="col">Generic Name</th>
                                                <th scope="col" className="action-column">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                drugList.map((drug, index) => (
                                                    <tr key={drug.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{drug.name}</td>
                                                        <td>{drug.quantity}</td>
                                                        <td>{drug.category}</td>
                                                        <td>{drug.company}</td>
                                                        <td>{drug.genericName}</td>
                                                        <td>
                                                            <a className="btn btn-success btn-sm" href={`/drug/${drug.id}`} role="button">View</a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }

                                            </tbody>
                                        </table>
                                        <MyPagination
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            activePage={activePage}
                                            itemsCountPerPage={10}
                                            totalItemsCount={totalRecord}
                                            pageRangeDisplayed={5}
                                            onChange={this.handlePageChange.bind(this)}
                                        />
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

export default Drug;