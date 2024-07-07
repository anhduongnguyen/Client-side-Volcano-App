import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";

// Table to display the volcanoes in the user's selected country
export default function Table({ rowData, columns }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={9}
          onGridReady={(params) => params.api.sizeColumnsToFit()}
          onRowClicked={(row) => navigate(`/volcano/${row.data.id}`)}
        />
      </div>
    </div>
  );
}
