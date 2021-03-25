import React, { Component } from 'react'
import axios from 'axios';
import './inventory.css'
//eslint-disable-next-line
const validEmailRegex = RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};
export class AddInventory extends Component {
    constructor(props) {

        super(props);

        this.state = {
            data: [],
            d: [],
            errors: {
                type: '',
                email: '',
                password: '',
            },
            selectedFile: null,
            siteCategory: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addinventory = this.addinventory.bind(this);
        this.handleprovincechange = this.handleprovincechange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onFileUpload = this.onFileUpload.bind(this)
        this.resolvesite = this.resolvesite.bind(this)
    }
    componentDidMount() {

    }
    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        console.log(this.state.selectedFile);
    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("/upload", formData);
    };

    handleprovincechange(event) {

    }
    resolvesite(site) {
        switch (site) {
            case "Shed A":
                return "Landscaping";
            case "Shed B":
                return "Small Tools";
            case "Shed C":
                return "Big Tools";
            default:
                break;
        }
    }
    handleChange(evt) {
        var fname = evt.target.name;
        var fvalue = evt.target.value;
        let errors = this.state.errors;
        var d = {
            ...this.state.data,
            [fname]: fvalue
        };
        var sc = "";
        switch (fname) {
            case 'type':
                errors.type =
                    fvalue.length < 1
                        ? 'Enter Type'
                        : '';
                break;
            case 'emailqq':
                errors.email =
                    validEmailRegex.test(fvalue)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'passwordqq':
                errors.password =
                    fvalue.length < 8
                        ? 'Password must be at least 8 characters long!'
                        : '';
                break;
            case 'site':
                sc = this.resolvesite(evt.target.value)
                if (sc.length > 0) {
                    d.siteCategory = sc;
                    this.setState({ siteCategory: sc })
                }
                break;
            default:
                break;
        }

        this.setState({ errors, [fname]: fvalue });
        console.log(d)
        this.setState({ data: d })
    }

    addinventory(event) {
        event.preventDefault();
       


        if (this.props.auth.user != null) {
            var d = {
                ...this.state.data, user: this.props.auth.user.data.idToken.payload["cognito:username"]
            }
            this.setState({ data: d }, () =>
                console.log(this.state.data)
            );

        }

        alert("coming soon")
        return


        if (validateForm(this.state.errors)) {
            alert('Valid Form')
            return
            //fun.postnewaccount(this.state.data)
        } else {
            alert('Invalid Form')
        }


    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container i jumbotron m-5">
                <form onSubmit={this.addinventory}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group d-flex">
                                <label htmlFor="type" >Type</label>
                                <input type="text" name="type" onChange={this.handleChange} className="form-control" id="type" placeholder="Type" />
                                {errors.type.length > 0 &&
                                    <span className='error'>{errors.type}</span>}
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="price ">Price</label>
                                <input type="text" name="price" onChange={this.handleChange} className="form-control" id="price" placeholder="Price" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="purchasedStore">purchasedStore</label>
                                <input type="text" name="purchasedStore" onChange={this.handleChange} className="form-control" id="purchasedStore" placeholder="purchasedStore" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="purchasedDate">purchasedDate</label>
                                <input type="date" name="purchasedDate" onChange={this.handleChange} className="form-control" id="purchasedDate" placeholder="purchasedDate" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="usedDate">usedDate</label>
                                <input type="date" name="usedDate" onChange={this.handleChange} className="form-control" id="usedDate" placeholder="usedDate" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="quantityRemaining">quantityRemaining</label>
                                <input type="text" name="quantityRemaining" onChange={this.handleChange} className="form-control" id="quantityRemaining" placeholder="quantityRemaining" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="accountname">Site</label>
                                <select name="site" onChange={this.handleChange} className="custom-select custom-select-sm">
                                    <option>Select Site</option>
                                    <option>Shed A</option>
                                    <option>Shed B</option>
                                    <option>Shed C</option>
                                </select>
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="siteCategory">siteCategory</label>
                                <input readOnly type="text" value={this.state.siteCategory} name="siteCategory" onChange={this.handleChange} className="form-control" id="siteCategory" placeholder="siteCategory" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group d-flex">
                                <label htmlFor="serial">serial</label>
                                <input type="text" name="serial" onChange={this.handleChange} className="form-control" id="serial" placeholder="serial" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="model">model</label>
                                <input type="text" name="model" onChange={this.handleChange} className="form-control" id="model" placeholder="model" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="partNum">Part Number</label>
                                <input type="text" name="partNum" onChange={this.handleChange} className="form-control" id="partNum" placeholder="partNum" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="soldDate">soldDate</label>
                                <input type="date" name="soldDate" onChange={this.handleChange} className="form-control" id="soldDate" placeholder="soldDate" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="disposedDate">disposedDate</label>
                                <input type="date" name="disposedDate" onChange={this.handleChange} className="form-control" id="disposedDate" placeholder="disposedDate" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="state">state</label>
                                <select name="state" onChange={this.handleChange} className="custom-select custom-select-sm">
                                    <option>Active</option>
                                    <option>Non Active</option>
                                </select>
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="quantity">quantity</label>
                                <input type="text" name="quantity" onChange={this.handleChange} className="form-control" id="quantity" placeholder="quantity" />
                            </div>
                            <div className="form-group d-flex">
                                <label htmlFor="user">User</label>
                                <input readOnly type="text" name="user"
                                    value={this.props.auth.isAuthenticated && this.props.auth.user &&
                                        (this.props.auth.user.data.idToken.payload["cognito:username"])}
                                    onChange={this.handleChange} className="form-control" id="user" placeholder="User" />
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>
            </div>
        );
    }
}

export default AddInventory

