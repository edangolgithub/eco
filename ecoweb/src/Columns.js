import axios from 'axios';
function updateRow(rowContent, row) {

    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.token
        }
    }
    axios.put(
        'https://nkys95a4t0.execute-api.us-east-1.amazonaws.com/Prod/api/inventory',
        row,
        config
    )
        .then((response) => {
            console.log(response)
            alert("updated")
        })
        .catch((er) => {
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
function deleteRow(rowContent, row) {

    let config = {
        headers: {
            'Authorization': 'Bearer ' + global.token
        }
    }

    axios.delete(
        'https://nkys95a4t0.execute-api.us-east-1.amazonaws.com/Prod/api/inventory/'+ row.id,
        
        config
    )
        .then((response) => {
            console.log(response)
            alert("deleted")
        })
        .catch((er) => {
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
export const columns = [{
    dataField: 'actions',
    text: 'Actions',
    isDummyField: true,
    csvExport: false,
    formatter: (rowContent, row) => {

        return (
            <button className="btn btn-success" onClick={() => updateRow(rowContent, row)} >Save</button>
        )

    }
},
{

    isDummyField: true,

    formatter: (rowContent, row) => {

        return (
            <button className="btn btn-success" onClick={() => deleteRow(rowContent, row)} >Delete</button>
        )

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
    },
    title: function callback(cell, row, rowIndex, colIndex) {
        return "Double click to edit"
    }
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
        return cell.substr(0, 10);
    },
    title: function callback(cell, row, rowIndex, colIndex) {
        return "Double click to edit"
    }

},

{
    dataField: 'quantityPurchased',
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
        return cell.substr(0, 10);
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
        return cell.substr(0, 10);
    }
},
{
    dataField: 'state',
    text: 'State',
    sort: true,
    formatter: (cell) => {
        cell = (cell === "1") ? "Active" : "Dead"
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

