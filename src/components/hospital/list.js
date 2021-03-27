import React from 'react'
import axios from "axios";
import Loading from "../loading";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';



class Hospital extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitalList: [],
            isLoading: false,
            page: 1,
            sizePerPage: 10,
            totalRecord: 0,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true})
        this.getHospitalList()
    }


    getHospitalList(){
        const pageNumber = this.state.page;
        axios.get('http://localhost:3005/api/v1/hospital?page='+pageNumber, {
            // sent how much record will get to show a page
            params: {
                sizePerPage: this.state.sizePerPage
            }
        }).then(response => {
            this.setState({
                hospitalList:response.data.hospitalList,
                totalRecord:response.data.totalItem,
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
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
                data: this.getHospitalList(),
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
                sort: true
            },
            {
                dataField: 'name',
                text: 'Name',
                sort: true
            },
            {
                dataField: 'categoryName',
                text: 'Category',
                sort: true
            },
            {
                dataField: 'Action',
                isDummyField: true,
                text: 'Action',
                formatter: (cellContent, row) => {
                    return (
                        <h5>
                            <a className="btn btn-success btn-sm py-0" target="_blank" href={`/hospital/${row.id}`} role="button"><i className="fa fa-eye"></i></a>
                        </h5>
                    );
                }
            },
        ];


        // take all values from state
        const { hospitalList, sizePerPage, page, totalRecord } = this.state;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Hospital Hospital List</div>
                    <div className="card-body">
                        {!this.state.isLoading ?
                            <div className="row">
                                <div className="col-12">
                                    <RemotePagination
                                        data={ hospitalList }
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

export default Hospital;