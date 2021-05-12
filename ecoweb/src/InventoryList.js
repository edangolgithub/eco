import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import Loader from './Loader'
import Circle from './CircleLoader'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    getallinventories, getinventorybycategory,
    getallinventoriesbyuser, getallinventoriesbystore
} from './Functions'
//import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
//import { columns } from './Columns'
// import { withAuthenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line
const selectrow = {
    mode: 'radio',

    clickToEdit: true,
    bgColor: 'pink',
    onSelect: (row, isSelect, rowIndex, e) => {

    }
}

const cellEdit = cellEditFactory({
    mode: 'dbclick',
    blurToSave: true,
    onStartEdit: (row, column, rowIndex, columnIndex) => {
        //console.log(row)
    },
    afterSaveCell: assf

});
function assf(oldValue, newValue, row, column) {
    //console.log(oldValue)
    // console.log(newValue)
    // console.log(row)
    // console.log(column)
}
// eslint-disable-next-line
const expandRow = {
    renderer: (row, rowIndex) => (
        // <div>
        //   <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
        //   <p>{row.price}</p>
        //   <p>{row.site}</p>
        // </div>
        <span></span>
    ),

    expandByColumnOnly: false,
    expandColumnPosition: 'right',
    showExpandColumn: true,
    expandColumnRenderer: ({ expanded, rowKey, expandable }) => {
        const onclick = (event) => {
            // console.log("clicked on row ", rowKey)
            // console.log("clicked on row ", expanded)
            // console.log("clicked on row ", expandable)
            // console.log(event)
        }

        if (!expandable) {
            return;
        }
        return (
            <button type="button" onClick={onclick} className="btn btn-outline-primary">
                {    "Edit"
                }
            </button>
        );
    }
};

export class InventoryList extends Component {

    updateRow(rowContent, row) {
        //console.log(row)
        this.setState({ circling: true })
        row.price = parseFloat(row.price)
        row.quantity = parseInt(row.quantity)
        row.quantityPurchased = parseInt(row.quantityPurchased);
        row.quantityRemaining = parseInt(row.quantityRemaining)
        row.state = parseInt(row.state)
        if (row.state !== 1) {
            row.state = 0;
        }
        console.log(row)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.token
            }
        }
        axios.put(
            'https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory',
            row,
            config
        )
            .then((response) => {
                console.log(response)
                alert("updated")
                this.setState({ circling: false })
            })
            .catch((er) => {
                this.setState({ circling: false })
                console.log(er.response)
                //alert(er.response)
                if (er.response.status === 403 || er.response.status === 401) {
                    alert("you are not authorized (contact Admin for adding privilege)");
                }
                else {
                    alert(er)
                }
            })

    }
    deleteRow(rowContent, row) {
        this.setState({ circling: true })
        let config = {
            headers: {
                'Authorization': 'Bearer ' + global.token
            }
        }
        console.log(row)

        axios.delete(
            'https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory/' + row.id,
            config
        )
            .then((response) => {
                console.log(response)

                const data = getinventorybycategory(row.site)
                data.then(x => {
                    //    console.log(data)
                    this.setState({ inventories: x })

                    this.setState({ circling: false })
                    alert("deleted")
                })
            })
            .catch((er) => {
                this.setState({ circling: false })
                console.log(er.response)
                //alert(er.response)
                if (er.response.status === 403 || er.response.status === 401) {
                    alert("you are not authorized (contact Admin for adding privilege)");
                }
                else {
                    alert(er)
                }
            })


    }


    pricehide = true;
    constructor() {
        super();
        this.state = {
            pricehidden: true,
            Loading: false,
            circling: false,
            user: "",
            store: "",
            inventories: [],
            columns: [{
                dataField: 'actions',
                text: 'Actions',
                isDummyField: true,
                csvExport: false,
                formatter: (rowContent, row) => {

                    return (
                        <button className="btn btn-success" onClick={() => this.updateRow(rowContent, row)} >
                            {this.state.circling ? <Circle /> : "Save"}
                        </button>
                    )

                }
            },
            {

                isDummyField: true,

                formatter: (rowContent, row) => {

                    return (
                        <span>

                            <button className="btn btn-success" onClick={() => this.deleteRow(rowContent, row)} > {this.state.circling ? <Circle /> : "Delete"}</button>
                        </span>)

                }
            },
            {
                dataField: 'siteCategory',
                text: 'Category',
                sort: true,
                style: {
                    color: 'gray',
                }, editable: false

            },
            {
                dataField: 'site',
                text: 'Site',
                sort: true,
                style: {
                    color: 'gray',
                }, editable: false
            },
            {
                dataField: 'entryDate',
                text: 'Entry Date',
                sort: true,
                formatter: (cell) => {
                     if(cell)
                     {
                    return cell.substr(0, 10);
                    }
                    else{
                        return "-"
                    }
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
                },
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                },
                hidden: true,
            },
            {
                dataField: 'purchasedStore',
                text: 'Store',
                sort: true,
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                }
            },

            {
                dataField: 'purchasedDate',
                text: 'Purchased Date',
                sort: true,
                formatter: (cell) => {
                     if(cell)
                     {
                    return cell.substr(0, 10);
                    }
                    else{
                        return "-"
                    }
                },
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                }

            },

            {
                dataField: 'quantity',
                text: 'Quantity',
                sort: true,
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                }

            },
            {
                dataField: 'quantityRemaining',
                text: 'Quantity Rem',
                sort: true,
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                }

            },
            {
                dataField: 'usedDate',
                text: 'Used Date',
                sort: true,
                formatter: (cell) => {
                     if(cell)
                     {
                    return cell.substr(0, 10);
                    }
                    else{
                        return "-"
                    }
                },
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                }

            },


            {
                dataField: 'serial',
                text: 'Serial',
                sort: true,
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                }
            },
            {
                dataField: 'model',
                text: 'Model',
                sort: true,
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                }
            },
            {
                dataField: 'partNum',
                text: 'Part Num',
                sort: true,
                title: function callback(cell, row, rowIndex, colIndex) {
                    return "Double click to edit"
                }
            },
            {
                dataField: 'soldDate',
                text: 'Sold Date',
                sort: true,
                formatter: (cell) => {
                    if(cell)
                    {
                    return cell.substr(0, 10);
                    }
                    else{
                        return "-"
                    }
                }
            },
            {
                dataField: 'state',
                text: 'State',
                sort: true,
                formatter: (cell) => {
                  
                    return cell;
                }

            },
            {
                dataField: 'user',
                text: 'User',
                sort: true,
                style: {
                    color: 'gray',
                }, editable: false
            }
            ]

        }
        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onUserSearchChange = this.onUserSearchChange.bind(this)
        this.onStoreSearchChange = this.onStoreSearchChange.bind(this)
        this.onUserSearch = this.onUserSearch.bind(this)
        this.onStoreSearch = this.onStoreSearch.bind(this)
        this.onAddInventory = this.onAddInventory.bind(this)
        this.editrow = this.editrow.bind(this)
        this.updateRow = this.updateRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
    }
    xyz() {
        alert("sdfds")
    }
    editrow(event) {
        event.preventDefault();
        console.log(this.state.rc);
        console.log(this.state.r)
    }
    onAddInventory(event) {
        event.preventDefault()
        this.props.history.push("/AddInventory");
    }
    onCategoryChange(event) {
        event.preventDefault()
        // console.log(this.state.columns)
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
            //    console.log(data)
            this.setState({ inventories: x })
            this.setState({ Loading: false });
        })


    }
    onUserSearch(e) {
        e.preventDefault();
        var data = getallinventoriesbyuser(this.state.user)
        data.then(x => {
            this.setState({ inventories: x })
        })
    }
    onUserSearchChange(e) {
        this.setState({ user: e.target.value })
    }
    onStoreSearch(e) {
        e.preventDefault();
        var data = getallinventoriesbystore(this.state.store)
        data.then(x => {
            this.setState({ inventories: x })
        })
    }
    onStoreSearchChange(e) {
        e.preventDefault();
        this.setState({ store: e.target.value })
    }
    componentDidMount() {
        this.pricehide = true;
        if (this.props.auth.user) {
            var role = this.props.auth.user.accessToken.payload["cognito:groups"];
            role.forEach(element => {
                if (element.includes("Admin") || element.includes("Manager")) {
                    this.state.columns.forEach(e=>{
                        if(e.dataField === 'price')
                        {
                            e.hidden=false;
                        }
                    })
                }
            });
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
                                bootstrap4
                                stiped
                                hover
                                condensed
                                keyField='id'
                                data={this.state.inventories}
                                columns={this.state.columns}
                                pagination={paginationFactory()}
                                version='4'
                                body
                                cellEdit={cellEdit}
                                classes="mb-5 table-fit"
                                title="hover me"
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

//export default withAuthenticator(InventoryList);
export default withRouter(InventoryList);
