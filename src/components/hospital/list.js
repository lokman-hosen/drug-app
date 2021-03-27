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
            //data: products.slice(0, 10),
            sizePerPage: 10,
            totalRecord: 11,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true})
        this.getHospitalList()
    }


    getHospitalList(){
        const pageNumber = this.state.page;
        console.log('pageNumber-'+pageNumber)
        axios.get('http://localhost:3005/api/v1/hospital?page='+pageNumber).then(response => {
            console.log(response.data.hospitalList);
            this.setState({
                hospitalList:response.data.hospitalList,
                //totalRecord:response.data.hospitalList,
                 //data: response.data.hospitalList.slice(0, 10),
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }
    handleTableChange = (type, { page, sizePerPage }) => {
        console.log('page-'+ page)
        this.setState({
            page: page,
        });
        const currentIndex = (page - 1) * sizePerPage;
        setTimeout(() => {
            this.setState(() => ({
                page,
                //data: products.slice(currentIndex, currentIndex + sizePerPage),
                data: this.getHospitalList(),
                sizePerPage
            }));
        }, 2000);
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



        //const hospitalList =  this.state.hospitalList;
        const { hospitalList, sizePerPage, page, totalRecord } = this.state;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Hospital Hospital List</div>
                    <div className="card-body">
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
                    </div>
                </div>


            </div>

        );
    }
}

export default Hospital;