import React, { Component } from 'react'
import Loader from './Loader'
//import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getallinventories, getinventorybycategory } from './Functions'

export class InventoryList extends Component {
    constructor() {
        super();
        this.state = {
            Loading: false,
            user: "",
            store: "",
            inventories: [],
            columns: [{
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
                // headerStyle: { backgroundColor: 'green' , width:"500px"},
                // style: {

                //     width:"500px"
                //   },

            },
            {
                dataField: 'price',
                text: 'Price',
                sort: true,
                formatter: (cell) => {
                    return "$ " + cell;
                }

            },
            {
                dataField: 'purchasedStore',
                text: 'Store',
                sort: true

            },

            {
                dataField: 'purchasedDate',
                text: 'Purchased Date',
                sort: true,
                formatter: (cell) => {
                    return cell.substr(0, 10);
                }

            },

            {
                dataField: 'quantityPurchased',
                text: 'Quantity',
                sort: true

            },
            {
                dataField: 'quantityRemaining',
                text: 'Quantity Rem',
                sort: true

            },
            {
                dataField: 'usedDate',
                text: 'Used Date',
                sort: true,
                formatter: (cell) => {
                    return cell.substr(0, 10);
                }

            },


            {
                dataField: 'serial',
                text: 'Serial',
                sort: true
            },
            {
                dataField: 'model',
                text: 'Model',
                sort: true
            },
            {
                dataField: 'partNum',
                text: 'Part Num',
                sort: true
            },
            {
                dataField: 'soldDate',
                text: 'Sold Date',
                sort: true,
                formatter: (cell) => {
                    return cell.substr(0, 10);
                }
            },
            {
                dataField: 'state',
                text: 'State',
                sort: true,
                formatter: (cell) => {
                    cell = (cell === 1) ? "Active" : "Dead"
                    return cell;
                }

            },
            {
                dataField: 'user',
                text: 'User',
                sort: true
            }
            ]
        }
        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onUserSearchChange = this.onUserSearchChange.bind(this)
        this.onStoreSearchChange = this.onStoreSearchChange.bind(this)
        this.onUserSearch = this.onUserSearch.bind(this)
        this.onStoreSearch = this.onStoreSearch.bind(this)

    }
    onCategoryChange(event) {
        event.preventDefault()
        this.setState({ Loading: true });
        // console.log(event.target.value)
        var data = [];
        switch (event.target.value) {
            case "ShedA":
            case "ShedB":
            case "ShedC":
                data = getinventorybycategory(event.target.value)

                break;
            default:
                data = getallinventories();
                break;
        }

        data.then(x => {
            console.log(data)
            this.setState({ inventories: x })
            this.setState({ Loading: false });
        })


    }
    onUserSearch(e) {
        e.preventDefault();
        console.log(this.state.user)
        alert("coming soon")
    }
    onUserSearchChange(e) {
        this.setState({ user: e.target.value })
    }
    onStoreSearch(e) {
        e.preventDefault();
        console.log(this.state.store)
        alert("coming soon")
    }
    onStoreSearchChange(e) {
        e.preventDefault();
        this.setState({ store: e.target.value })
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="container">
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
                        </div>
                    </div>
                    <div className="tableclass">
                        {this.state.Loading ? <Loader style={{ textAlign: "center" }} /> :
                            <BootstrapTable
                                stiped
                                hover
                                keyField='id'
                                data={this.state.inventories}
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

export default InventoryList
