import React from 'react'
import axios from "axios";

class Branch extends React.Component {
    state = {
        instituteList: []
    }

    componentDidMount() {
        var self = this;
        axios.get('http://localhost:3005/api/v1/institute-list')
            .then(function (response) {
                if (response){
                    //console.log(response.data.instituteList)
                    const instituteList = response.data.instituteList;
                    //console.log(instituteList)
                    self.setState({
                        instituteList,
                    });
                }
            }).catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    render() {
        //console.log(this.state.instituteList)
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.instituteList.map(item => (
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                ))
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

export default Branch;