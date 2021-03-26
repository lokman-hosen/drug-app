import React from 'react'
import axios from "axios";
import Loading from "../loading";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';



class Hospital extends React.Component {
    state = {
        hospitalList: [],
        isLoading: false,
       /* page: 1,
        data: [],
        sizePerPage: 10,
        totalRecord: 0,*/
    }

    componentDidMount() {
        this.setState({ isLoading: true})
        this.getHospitalList()
    }


    getHospitalList(){
        axios.get('http://localhost:3005/api/v1/hospital').then(response => {
            this.setState({
                hospitalList:response.data.hospitalList,
                 //data: response.data.hospitalList.slice(0, 10),
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }


    render() {
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
                    // console.log(row.id);
                    return (
                        <h5>
                            <a className="btn btn-success btn-sm py-0" target="_blank" href={`/hospital/${row.id}`} role="button"><i className="fa fa-eye"></i></a>
                        </h5>
                    );
                }
            },
        ];



        const hospitalList =  this.state.hospitalList;
        /*const options = {
            onSizePerPageChange: (sizePerPage, page) => {
                console.log('Size per page change!!!');
                console.log('Newest size per page:' + sizePerPage);
                console.log('Newest page:' + page);
            },
            onPageChange: (page, sizePerPage) => {
                console.log('Page change!!!');
                console.log('Newest size per page:' + sizePerPage);
                console.log('Newest page:' + page);
            }
        };*/

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Hospital Hospital List</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <BootstrapTable
                                    keyField="id"
                                    data={ hospitalList }
                                    columns={ columns }
                                    pagination={ paginationFactory() }
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        );
    }
}

export default Hospital;