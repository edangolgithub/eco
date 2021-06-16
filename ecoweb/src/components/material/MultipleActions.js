import React, { Component } from "react";
import MaterialTable from "material-table";
import {
  getallinventories,
  getinventorybycategory,
  getallinventoriesbyuser,
  getallinventoriesbystore,
  deleteinventory,
} from "../../Functions";
import Loader from "../../Loader";
//import Circle from "../../CircleLoader";
export class MultipleActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      inventories: [],
      Loading: false,
      circling: false,
      selectedcategory: "",
      columns: [
        { title: "Type", field: "type" },
        { title: "Serial", field: "serial" },
        { title: "Model", field: "model" },
        { title: "Price", field: "price" },
        { title: "quantity", field: "quantity", type: "numeric" },
        { title: "Purchased Store", field: "purchasedStore" },
        { title: "Date Purchased", field: "purchasedDate", type: "date" },
        { title: "Qty", field: "quantity" },
        { title: "Remaining", field: "quantityRemaining" },
        { title: "Used Date", field: "usedDate", type: "date" },
        { title: "PartNum", field: "partNum" },
        { title: "Sold Date", field: "soldDate", type: "date" },
        { title: "State", field: "state" },
      ],
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onUserSearchChange = this.onUserSearchChange.bind(this);
    this.onStoreSearchChange = this.onStoreSearchChange.bind(this);
    this.onUserSearch = this.onUserSearch.bind(this);
    this.onStoreSearch = this.onStoreSearch.bind(this);
  }

  onCategoryChange(event) {
    event.preventDefault();
    // console.log(this.state.columns)
    this.setState({ Loading: true });
    this.setState({ selectedcategory: event.target.value });
    var data = [];
    switch (event.target.value) {
      case "ShedA":
      case "ShedB":
      case "ShedC":
        data = getinventorybycategory(event.target.value);

        break;
      default:
        data = getallinventories();
        break;
    }

    data.then((x) => {
      //    console.log(data)
      this.setState({ inventories: x });
      this.setState({ Loading: false });
    });
  }
  onUserSearch(e) {
    e.preventDefault();
    var data = getallinventoriesbyuser(this.state.user);
    data.then((x) => {
      this.setState({ inventories: x });
    });
  }
  onUserSearchChange(e) {
    this.setState({ user: e.target.value });
  }
  onStoreSearch(e) {
    e.preventDefault();
    var data = getallinventoriesbystore(this.state.store);
    data.then((x) => {
      this.setState({ inventories: x });
    });
  }
  onStoreSearchChange(e) {
    e.preventDefault();
    this.setState({ store: e.target.value });
  }
  componentDidMount() {
    // var d = getallinventories().then((x) => {
    //   this.setState({ data: x }, () => {
    //     console.log(this.state.data);
    //   });
    // });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row mb-1">
            <div className="col-sm">
              <select
                onChange={this.onCategoryChange}
                className="custom-select custom-select-sm"
              >
                <option value="all">Categories</option>
                <option value={"ShedA"}>Landscaping</option>
                <option value={"ShedB"}>Small Tools</option>
                <option value={"ShedC"}>Big Tools</option>
                <option value={"all"}>All</option>
              </select>
            </div>
            <div className="col-sm d-flex">
              <input
                type="text"
                onChange={this.onUserSearchChange}
                className="form-control mr-1"
                id="usersearch"
                placeholder="user"
              />
              <button
                onClick={this.onUserSearch}
                className="btn btn-success float-left"
              >
                Search
              </button>
            </div>
            <div className="col-sm d-flex">
              <input
                type="text"
                onChange={this.onStoreSearchChange}
                className="form-control mr-1"
                id="storesearch"
                placeholder="Store"
              />
              <button
                onClick={this.onStoreSearch}
                className="btn btn-success binline"
              >
                Search
              </button>
            </div>
            <div className="col-sm d-flex">
              <button
                onClick={this.onAddInventory}
                className="btn btn-success binline"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="tableclass">
          {this.state.Loading ? (
            <Loader style={{ textAlign: "center" }} />
          ) : (
            <MaterialTable
              title="Inventory List"
              columns={this.state.columns}
              // data={[
              //   {
              //     name: "Mehmet",
              //     surname: "Baran",
              //     birthYear: 1987,
              //     birthCity: 63,
              //   },
              //   {
              //     name: "Zerya Betül",
              //     surname: "Baran",
              //     birthYear: 2017,
              //     birthCity: 34,
              //   },
              // ]}
              data={this.state.inventories}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                   // console.log(rowData);
                    this.props.history.push({
                      pathname: "/EditInventory",

                      state: rowData,
                    });
                    //this.props.history.push("/EditInventory"), //alert("You saved " + rowData.name)
                  },
                },
                {
                  icon: "delete",
                  tooltip: "Delete User",
                  onClick:async (event, rowData) => {
                    var res = window.confirm(
                      "You want to delete " + rowData.type
                    );
                    if (res) {
                      event.target.disabled = true;
                     // console.log(rowData);
                     const data= await deleteinventory(rowData.id);
                     if(data)
                     {
                        alert("deleted");
                        this.props.history.push("/");
                     }
                      
                    }
                  },
                },
              ]}
              options={{
                search: true,
                headerStyle: {
                  backgroundColor: "#5cb85c",
                  color: "#FFF",
                },
                pageSize: 20,
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default MultipleActions;
