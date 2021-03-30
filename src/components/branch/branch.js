import React from 'react'
import axios from "axios";
import Loading from "../loading";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';


class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instituteList: [],
            isLoading: false,
            page: 1,
            sizePerPage: 5,
            totalRecord: 50,
            sortOrder: ['asc', 'desc']
        };
        this.handleTableChange = this.handleTableChange.bind(this);
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
    handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
        const currentIndex = (page - 1) * sizePerPage;
        console.log('sortField'+sortField)
        if (sortField != null){
            //get sortOrder from state to sort randomly
            var item = this.state.sortOrder.sort(function() {return 0.5 - Math.random()})[0];
            setTimeout(() => {
                const sortOrder = item
                let result = this.state.instituteList;
                // Handle column filters
                /*result = result.filter((row) => {
                    console.log('11')
                    let valid = true;
                    for (const dataField in filters) {
                        const { filterVal, filterType, comparator } = filters[dataField];

                        if (filterType === 'TEXT') {
                            if (comparator === Comparator.LIKE) {
                                valid = row[dataField].toString().indexOf(filterVal) > -1;
                            } else {
                                valid = row[dataField] === filterVal;
                            }
                        }
                        if (!valid) break;
                    }
                    return valid;
                });*/
                // Handle column sort
                if (sortOrder === 'asc') {
                    console.log('55')
                    result = result.sort((a, b) => {
                        if (a[sortField] > b[sortField]) {
                            return 1;
                        } else if (b[sortField] > a[sortField]) {
                            return -1;
                        }
                        return 0;
                    });
                } else {
                    console.log('66')
                    result = result.sort((a, b) => {
                        if (a[sortField] > b[sortField]) {
                            return -1;
                        } else if (b[sortField] > a[sortField]) {
                            return 1;
                        }
                        return 0;
                    });
                }
                this.setState(() => ({
                    page,
                    instituteList: result,
                    totalSize: 20,
                    sizePerPage
                }));
            }, 100);
        }else {
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
    }

    render() {
        const RemoteAll = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
            <div>
                <BootstrapTable
                    bootstrap4
                    remote
                    keyField="id"
                    data={ data }
                    columns={ columns }
                    filter={ filterFactory() }
                    pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
                    onTableChange={ onTableChange }
                    //defaultSortDirection="asc"
                />
            </div>
        );

        /*RemoteAll.propTypes = {
            data: PropTypes.array.isRequired,
            page: PropTypes.number.isRequired,
            totalSize: PropTypes.number.isRequired,
            sizePerPage: PropTypes.number.isRequired,
            onTableChange: PropTypes.func.isRequired
        };*/

        // columns want to display in table
        const columns = [
            {
                dataField: 'id',
                text: 'Sr No',
                sort: true
            },
            {
                dataField: 'name',
                text: 'Branch Name',
                //filter: textFilter(),
                sort: true
            },
            {
                dataField: 'hospitalName',
                text: 'Hospital Name',
                //filter: textFilter(),
                sort: true
            },
            {
                dataField: 'address',
                text: 'Address',
                //filter: textFilter(),
                sort: true
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
        const { instituteList, sizePerPage, page , totalRecord} = this.state;

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">Hospital Branch List</div>
                    <div className="card-body">
                        {!this.state.isLoading ?
                            <div className="row">
                                <div className="col-12">
                                    {/*<RemotePagination
                                        data={ instituteList }
                                        page={ page }
                                        sizePerPage={ sizePerPage }
                                        totalSize={ totalRecord }
                                        onTableChange={ this.handleTableChange }
                                    />*/}

                                    <RemoteAll
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