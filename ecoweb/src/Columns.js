export const columns= [{
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
