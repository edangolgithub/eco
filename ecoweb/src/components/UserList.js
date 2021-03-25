import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Loader from './Loader'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export class UserList extends Component {
    constructor() {
        super();
        this.state = {
            Loading: false,
            user: "",
            store: "",
            users: [],
            columns:
                [{
                    dataField: 'siteCategory',
                    text: 'Category',
                    sort: true,
                    style: {
                        color: 'red',
                    }

                },
                {
                    dataField: 'site',
                    text: 'Site',
                    sort: true
                },
                {
                    dataField: 'entryDate',
                    text: 'Entry Date',
                    sort: true,
                    formatter: (cell) => {
                        return cell.substr(0, 10);
                    }

                },
                {
                    dataField: 'price',
                    text: 'Price',
                    sort: true

                }]
        }
    }

    render() {

        return (
            <div>
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="row mb-1">
                            <div className="col-sm">
                                <select onChange={this.onCategoryChange} className="custom-select custom-select-sm">
                                    <option value="all">Categories</option>
                                    <option value={"ShedA"}>Landscaping</option>
                                    <option value={"ShedB"}>Small Tools</option>
                                    <option value={"ShedC"}>Big Tools</option>
                                    <option value={"all"}>All</option>
                                </select>
                            </div>
                            <div className="col-sm d-flex">
                                <input type="text" onChange={this.onUserSearchChange}
                                    className="form-control mr-1" id="usersearch" placeholder="user" />
                                <button onClick={this.onUserSearch} className="btn btn-success float-left">Search</button>
                            </div>
                            <div className="col-sm d-flex">
                                <input type="text" onChange={this.onStoreSearchChange}
                                    className="form-control mr-1" id="storesearch" placeholder="Store" />
                                <button onClick={this.onStoreSearch} className="btn btn-success binline">Search</button>

                            </div>
                            <div className="col-sm d-flex">
                                <button onClick={this.onAddInventory} className="btn btn-success binline">Add</button>

                            </div>
                        </div>
                    </div>
                    <div className="tableclass">
                        {this.state.Loading ? <Loader style={{ textAlign: "center" }} /> :
                            <BootstrapTable
                                stiped
                                hover
                                keyField='id'
                                data={this.state.users}
                                columns={this.state.columns}
                                pagination={paginationFactory()}
                                version='4'
                                body
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserList);

