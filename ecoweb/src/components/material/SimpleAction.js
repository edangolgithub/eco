import React, { Component } from "react";
import MaterialTable from "material-table";
export class SimpleAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" },
        { title: "Surname", field: "surname" },
        { title: "Birth Year", field: "birthYear", type: "numeric" },
        {
          title: "Birth Place",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
        },
      ],
      data: [
        { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
        {
          name: "Zerya Betül",
          surname: "Baran",
          birthYear: 2017,
          birthCity: 34,
        },
      ],
    };

    this.options = {
      search: false,
      rowStyle: (rowData) => ({
        backgroundColor:    "#67aeae",
      }),
    };
    this.onRowClick = this.onRowClick.bind(this);
  }
  onRowClick = (evt, selectedRow) => {
    // setSelectedRow(selectedRow.tableData.id)
    console.log(selectedRow);
  };

  render() {
    return (
      <div>
        <MaterialTable
          columns={this.state.columns}
          data={this.state.data}
          onRowClick={this.onRowClick}
          options={this.options}
          title="Simple Action Preview"
        />
      </div>
    );
  }
}

export default SimpleAction;
