import React from 'react'
import MyPagination from "react-js-pagination";

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            activePage: 15
        };
    }

    handlePageChange(pageNumber) {

        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div>
                            <MyPagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                totalItemsCount={this.props.totalItemsCount}
                                pageRangeDisplayed={this.props.pageRangeDisplayed}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Pagination;