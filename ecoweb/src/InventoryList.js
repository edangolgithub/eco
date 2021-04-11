import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Loader from './Loader'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {
    getallinventories, getinventorybycategory,
    getallinventoriesbyuser, getallinventoriesbystore
} from './Functions'
import { columns } from './Columns'
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
            console.log("clicked on row ", rowKey)
            console.log("clicked on row ", expanded)
            console.log("clicked on row ", expandable)
            console.log(event)
        }

        if (!expandable) {
            return;
        }
        return (
            <button type="button" onClick={onclick} className="btn btn-outline-primary">Edit</button>
        );
    }
};

export class InventoryList extends Component {
    constructor() {
        super();
        this.state = {
            Loading: false,
            user: "",
            store: "",
            inventories: [],
            columns: columns,

        }
        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.onUserSearchChange = this.onUserSearchChange.bind(this)
        this.onStoreSearchChange = this.onStoreSearchChange.bind(this)
        this.onUserSearch = this.onUserSearch.bind(this)
        this.onStoreSearch = this.onStoreSearch.bind(this)
        this.onAddInventory = this.onAddInventory.bind(this)
        this.editrow = this.editrow.bind(this)

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
