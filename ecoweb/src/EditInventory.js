import React, { Component } from "react";
import axios from "axios";
import "./inventory.css";
//import Loader from '../../Loaders/Loader'
import ClockLoader from "./components/Loaders/Loader";

export class EditInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      row: {},
      d: [],
      errors: {},
      selectedFile: null,
      siteCategory: "",
      saving: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateinventory = this.updateinventory.bind(this);
    this.handleprovincechange = this.handleprovincechange.bind(this);
    this.resolvesite = this.resolvesite.bind(this);
    this.checkdate = this.checkdate.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
    this.setState({ row: this.props.location.state }, () => {
      console.log(this.state.row);
    });
    // console.log(props);
  }

  handleprovincechange(event) {}
  resolvesite(site) {
    switch (site) {
      case "ShedA":
        return "Landscaping";
      case "ShedB":
        return "Small Tools";
      case "ShedC":
        return "Big Tools";
      default:
        break;
    }
  }
  checkdate(myDate) {
    var startDate = new Date(1990, 11, 1);
    var endDate = new Date(2050, 1, 1);
    if (startDate < myDate && myDate < endDate) {
      return true;
    }
    return false;
  }
  handleChange(evt) {
    var fname = evt.target.name;
    var fvalue = evt.target.value;
    let errors = this.state.errors;
    var d = {
      ...this.state.row,
      [fname]: fvalue,
    };
    var sc = "";
    switch (fname) {
      case "type":
        console.log(fvalue);
        if (fvalue.length < 1) {
          errors.type = "invalid type";
        }

        break;

      case "price":
        d.price = parseFloat(d.price);
        if (!d.price) {
          errors.price = "invalid price";
        } else {
          delete errors.price;
        }
        break;
      case "quantityPurchased":
        d.quantityPurchased = parseInt(d.quantityPurchased);
        if (!d.quantityPurchased) {
          errors.quantityPurchased = "invalid quantityPurchased";
        } else {
          delete errors.quantityPurchased;
        }
        break;
      case "quantityRemaining":
        d.quantityRemaining = parseInt(d.quantityRemaining);
        if (!d.quantityRemaining) {
          errors.quantityRemaining = "invalid quantityRemaining";
        } else {
          delete errors.quantityRemaining;
        }
        break;
      case "quantity":
        d.quantity = parseInt(d.quantity);
        if (!d.quantity) {
          errors.quantity = "invalid quantity";
        } else {
          delete errors.quantity;
        }
        break;
      case "usedDate":
        var date = Date.parse(d.usedDate);
        if (date) {
          if (!this.checkdate(date)) {
            errors.usedDate = "invalid used date";
          } else {
            delete errors.usedDate;
          }
        }
        // console.log(errors);
        break;
      case "purchasedDate":
        date = Date.parse(d.purchasedDate);
        if (date) {
          if (!this.checkdate(date)) {
            errors.usedDate = "invalid Purchased Date";
          } else {
            delete errors.usedDate;
          }
        }
        //console.log(errors);
        break;
      case "site":
        sc = this.resolvesite(evt.target.value);
        if (sc.length > 0) {
          d.siteCategory = sc;
          this.setState({ siteCategory: sc });
        }
        break;
      default:
        break;
    }

    this.setState({ errors, [fname]: fvalue });
    // console.log(d);
    this.setState({ row: d });
  }

  updateinventory(event) {
    event.preventDefault();
    this.setState({ saving: true });
    // console.log(this.state.data)
    // console.log(this.props)
    var us = sessionStorage.getItem("user");
    console.log(JSON.parse(us));
    if (this.props.auth.user != null || us !== null) {
      var d = {
        ...this.state.row,
        user: this.props.auth.user.idToken.payload["cognito:username"],
      };
      this.setState({ row: d }, () => {
        // console.log(this.state.data)
      });
    } else {
      alert("Login to Continue");
      this.setState({ saving: false });
      return;
    }
    if (!d.site) {
      alert("form is incomplete \nPlease Input valid data");
      this.setState({ saving: false });
      return;
    }
    //console.log(d);

    //  alert("coming soon")
    console.log(d);
    if (!this.state.errors.length) {
      // console.log("er bel");
      // console.log(this.state.errors);
      let config = {
        headers: {
          Authorization: "Bearer " + this.props.auth.user.idToken.jwtToken,
        },
      };
      axios
        .put(
          "https://5w9ovuk4sh.execute-api.us-east-1.amazonaws.com/api/inventory",
          d,
          config
        )
        .then((response) => {
          console.log(response);
          this.setState({ saving: false });
          alert("saved");
        })
        .catch((er) => {
          console.log(er.response);
          //alert(er.response)
          if (er.response.status === 403) {
            alert(
              "you are not authorized (contact Admin for adding privilege)"
            );
            this.setState({ saving: false });
          }
          if (er.response.status === 401) {
            alert("your session has expired. please login again");
            sessionStorage.removeItem("user");
            this.props.history.push("/login");
            this.setState({ saving: false });
          } else {
            alert(er);
            this.setState({ saving: false });
          }
        });

      //fun.postnewaccount(this.state.data)
    } else {
      console.log(this.state.errors);
      alert("Invalid Form");
      this.setState({ saving: false });
    }
  }

  render() {
    const { errors } = this.state;
    // console.log(errors);
    return (
      <div>
        <div className="card">
          <h3>Please Fill The Form</h3>
        </div>
        <div className="container i jumbotron  p-3 mt-1">
          <form onSubmit={this.updateinventory}>
            <div className="row">
              <div className="col">
                <div className="form-group d-flex">
                  <label htmlFor="type">Id</label>
                  <input
                    type="text"
                    name="id"
                    onChange={this.handleChange}
                    className="form-control"
                    id="id"
                    placeholder="Id"
                    value={this.state.row.id}
                    disabled
                  />
                  {
                    // errors &&
                    //errors.type.length > 0 && (
                    // <span className="error">{errors.type}</span>
                    //  )
                  }
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    name="type"
                    onChange={this.handleChange}
                    className="form-control"
                    id="type"
                    placeholder="Type"
                    value={this.state.row.type}
                  />
                  {
                    // errors &&
                    //errors.type.length > 0 && (
                    // <span className="error">{errors.type}</span>
                    //  )
                  }
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="price ">Price</label>
                  <input
                    type="text"
                    name="price"
                    onChange={this.handleChange}
                    className="form-control"
                    id="price"
                    placeholder="(dont enter $ sign)"
                    value={this.state.row.price}
                  />
                  {errors && <span className="error">{errors.price}</span>}
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="purchasedStore">Purchased Store</label>
                  <input
                    type="text"
                    name="purchasedStore"
                    onChange={this.handleChange}
                    className="form-control"
                    id="purchasedStore"
                    placeholder="purchasedStore"
                    value={this.state.row.purchasedStore}
                  />
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="purchasedDate">Purchased Date</label>
                  <input
                    type="date"
                    name="purchasedDate"
                    onChange={this.handleChange}
                    className="form-control"
                    id="purchasedDate"
                    placeholder="purchasedDate"
                    value={this.state.row.purchasedDate}
                  />
                  {errors && (
                    <span className="error">{errors.purchasedDate}</span>
                  )}
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    onChange={this.handleChange}
                    className="form-control"
                    id="quantity"
                    placeholder="quantity"
                    value={this.state.row.quantity}
                  />
                  {errors && <span className="error">{errors.quantity}</span>}
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="usedDate">Used Date</label>
                  <input
                    type="date"
                    name="usedDate"
                    onChange={this.handleChange}
                    className="form-control"
                    id="usedDate"
                    placeholder="usedDate"
                    value={this.state.row.usedDate}
                  />
                  {errors && <span className="error">{errors.usedDate}</span>}
                </div>

                <div className="form-group d-flex">
                  <label htmlFor="accountname">Site</label>
                  <select
                    name="site"
                    onChange={this.handleChange}
                    className="custom-select custom-select-sm"
                    value={this.state.row.site}
                  >
                    <option>Select Site</option>
                    <option value="ShedA">Shed A</option>
                    <option value="ShedB">Shed B</option>
                    <option value="ShedC">Shed C</option>
                  </select>
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="siteCategory">Site Category</label>
                  <input
                    readOnly
                    type="text"                    
                    name="siteCategory"
                    onChange={this.handleChange}
                    className="form-control"
                    id="siteCategory"
                    placeholder="siteCategory"
                    value={this.state.row.siteCategory}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group d-flex">
                  <label htmlFor="serial">Serial</label>
                  <input
                    type="text"
                    name="serial"
                    onChange={this.handleChange}
                    className="form-control"
                    id="serial"
                    placeholder="serial"
                    value={this.state.row.serial}
                  />
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="model">Model</label>
                  <input
                    type="text"
                    name="model"
                    onChange={this.handleChange}
                    className="form-control"
                    id="model"
                    placeholder="model"
                    value={this.state.row.model}
                  />
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="partNum">Part Number</label>
                  <input
                    type="text"
                    name="partNum"
                    onChange={this.handleChange}
                    className="form-control"
                    id="partNum"
                    placeholder="partNum"
                    value={this.state.row.partNum}
                  />
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="soldDate">Sold Date</label>
                  <input
                    type="date"
                    name="soldDate"
                    onChange={this.handleChange}
                    className="form-control"
                    id="soldDate"
                    placeholder="soldDate"
                    value={this.state.row.soldDate}
                  />
                  {errors && <span className="error">{errors.soldDate}</span>}
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="disposedDate">Disposed Date</label>
                  <input
                    type="date"
                    name="disposedDate"
                    onChange={this.handleChange}
                    className="form-control"
                    id="disposedDate"
                    placeholder="disposedDate"
                    value={this.state.row.disposedDate}
                  />
                  {errors && (
                    <span className="error">{errors.disposedDate}</span>
                  )}
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="quantityRemaining">Quantity Remaining</label>
                  <input
                    type="text"
                    name="quantityRemaining"
                    onChange={this.handleChange}
                    className="form-control"
                    id="quantityRemaining"
                    placeholder="quantityRemaining"
                    value={this.state.row.quantityRemaining}
                  />
                  {errors && (
                    <span className="error">{errors.quantityRemaining}</span>
                  )}
                </div>
                <div className="form-group d-flex">
                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    onChange={this.handleChange}
                    className="custom-select custom-select-sm"
                  >
                    <option value="1">Active</option>
                    <option value="0">Non Active</option>
                  </select>
                </div>

                <div className="form-group d-flex">
                  <label htmlFor="user">User</label>
                  <input
                    readOnly
                    type="text"
                    name="user"
                    value={
                      this.props.auth.isAuthenticated &&
                      this.props.auth.user &&
                      this.props.auth.user.idToken.payload["cognito:username"]
                    }
                    onChange={this.handleChange}
                    className="form-control"
                    id="user"
                    placeholder="User"
                  />
                </div>
              </div>
            </div>
            {this.state.saving ? (
              <ClockLoader />
            ) : (
              <input
                type="submit"
                value="Submit"
                className="mr-2 btn btn-primary"
              />
            )}

            <input type="reset" value="Clear" className="btn btn-danger  " />
          </form>
        </div>
      </div>
    );
  }
}

export default EditInventory;
