import React from 'react'
import axios from "axios";
import Loading from "../loading";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instituteList: [],
            isLoading: false,
            page: 1,
            sizePerPage: 10,
            totalRecord: 0,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true})
        this.getBranchList()
    }




    getBranchList(){
        const pageNumber = this.state.page;
        console.log('pageNumber:'+pageNumber)
        axios.get('http://localhost:3005/api/v1/institute?page='+pageNumber, {
            // sent how much record will get to show a page
            params: {
                sizePerPage: this.state.sizePerPage
            }
        }).then(response => {
            this.setState({
                instituteList:response.data.instituteList,
                totalRecord:response.data.totalItem,
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }
    deleteItem = (id) => {
        const answer = window.confirm("Are you sure want to delete?");
        if (answer) {
            axios.delete('http://localhost:3005/api/v1/institute/'+id)
                .then((response) => {
                    this.getBranchList()
                })
                /*.then(function (response) {
                    if (response){
                        window.location.reload();
                    }
                })*/.catch(function (error) {
                // handle error
                console.log(error);
            });
        }
        else {
            //some code
        }

    }

    // call this function when click on pagination button
    handleTableChange = (type, { page, sizePerPage }) => {
        console.log(sizePerPage)
        this.setState({
            page: page,
            sizePerPage: sizePerPage,
            isLoading: true
        });
        // get data for next page
        setTimeout(() => {
            this.setState(() => ({
                data: this.getBranchList(),
            }));
        }, 100);
    }

    render() {
        const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
            <div>
                <BootstrapTable
                    remote
                    keyField="id"
                    data={ data }
                    columns={ columns }
                    pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
                    onTableChange={ onTableChange }
                />
            </div>
        );

        // columns want to display in table
        const columns = [
            {
                dataField: 'id',
                text: 'Sr No',
            },
            {
                dataField: 'name',
                text: 'Branch Name',
            },
            {
                dataField: 'hospitalName',
                text: 'Hospital Name',
            },
            {
                dataField: 'address',
                text: 'Address',
            },
            {
                dataField: 'contact_numbers',
                text: 'Contact',
            },
            {
                dataField: 'Action',
                isDummyField: true,
                text: 'Action',
                formatter: (cellContent, row) => {
                    return (
                        <h5>
                            <button className="btn btn-danger btn-sm me-1 py-0" type="button" onClick={() => this.deleteItem(row.id)}>
                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            <a className="btn btn-success btn-sm py-0" href={`/hospital/${row.id}/edit`} role="button">
                                <i className="fa fa-edit"></i>
                            </a>
                        </h5>
                    );
                }
            },
        ];

        // take all values from state
        const { instituteList, sizePerPage, page, totalRecord } = this.state;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Hospital Branch List</div>
                    <div className="card-body">
                        {!this.state.isLoading ?
                            <div className="row">
                                <div className="col-12">
                                    <RemotePagination
                                        data={ instituteList }
                                        page={ page }
                                        sizePerPage={ sizePerPage }
                                        totalSize={ totalRecord }
                                        onTableChange={ this.handleTableChange }
                                    />
                                </div>
                            </div>
                            : <Loading />
                        }
                    </div>
                </div>

            </div>

        );
    }
}

export default Branch;