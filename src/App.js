import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import data from "./data.json";
// import "./grid.scss";
// import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const columnDefs = [
    [
      {
        field: "athlete",
        minWidth: 150,
        checkboxSelection: true,
      },
      { field: "age", maxWidth: 90 },
      { field: "country", minWidth: 150 },
      { field: "sport", minWidth: 150 },
      { field: "gold" },
    ],
  ];

  const [rowData, setRowData] = useState(data);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const clearCells = (start, end, columns, gridApi) => {
    let rowIds = {}; // only update rows that ids exists within this obj

    for (let i = start; i <= end; i++) {
      let rowId = gridApi.rowModel.rowsToDisplay[i].id;
      rowIds[rowId] = true;
    }

    setRowData((prevRowData) =>
      prevRowData.map((row) => {
        if (!rowIds[row.id]) return row;

        let newRow = { ...row };

        columns.forEach((colId) => {
          newRow[colId] = "";
        });

        return newRow;
      })
    );
  };

  const deleteBtn = (params) => {
    if (!params.editing) {
      // console.log(params);
      let isBackspaceKey = params.event.keyCode === 8;
      let isDeleteKey = params.event.keyCode === 46;

      // Delete selected rows with back space

      if (isBackspaceKey) {
        const selectedRows = params.api.getSelectedRows();

        setRowData(
          rowData.filter((row) => {
            return selectedRows.indexOf(row) == -1; // filter out selected rows
          })
        );

        return true;
      }
    }
  };

  const onSuppressKeyboardEvent = (params) => {
    if (!params.editing) {
      console.log(params);
      let isBackspaceKey = params.event.keyCode === 8;
      let isDeleteKey = params.event.keyCode === 46;

      // Delete selected rows with back space

      if (isBackspaceKey) {
        const selectedRows = params.api.getSelectedRows();

        setRowData(
          rowData.filter((row) => {
            return selectedRows.indexOf(row) == -1; // filter out selected rows
          })
        );

        return true;
      }

      // delete range selected cell values

      if (isDeleteKey) {
        // for each of our range selection

        params.api.getCellRanges().forEach((range) => {
          let colIds = range.columns.map((col) => col.colId);

          let startRowIndex = Math.min(
            range.startRow.rowIndex,
            range.endRow.rowIndex
          );
          let endRowIndex = Math.max(
            range.startRow.rowIndex,
            range.endRow.rowIndex
          );

          clearCells(startRowIndex, endRowIndex, colIds, params.api);
        });
      }

      return false;
    }
  };

  var gridOptions1 = {
    defaultColDef: {
      resizable: true,
      sortable: true,
    },
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 100,
    enableCellChangeFlash: true,
    groupDefaultExpanded: 1,
    rowGroupPanelShow: "always",
    groupHideOpenParents: true,
    suppressAggFuncInHeader: true,
    suppressPropertyNamesCheck: true,
    enableRangeSelection: true,
    suppressRowClickSelection: true,
    columnDefs: columnDefs,
    rowData: null,
    onGridReady: function (params) {
      setTimeout(function () {
        params.api.setRowData(data);
      }, 2000);
    },

    rowSelection: "multiple", //????????? ??????. multiple ??????????????? ??? ????????? ????????? ????????? ?????? ?????? ?????? ????????? ?????????
  };
  var gridOptions2 = {
    defaultColDef: {
      resizable: true,
      sortable: true,
    },
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 100,
    enableCellChangeFlash: true,
    groupDefaultExpanded: 1,
    rowGroupPanelShow: "always",
    groupHideOpenParents: true,
    suppressAggFuncInHeader: true,
    suppressPropertyNamesCheck: true,
    enableRangeSelection: true,
    suppressRowClickSelection: true,
    columnDefs: columnDefs,
    rowData: null,
    onGridReady: function (params) {
      setTimeout(function () {
        params.api.setRowData(data);
      }, 2000);
    },

    rowSelection: "multiple", //????????? ??????. multiple ??????????????? ??? ????????? ????????? ????????? ?????? ?????? ?????? ????????? ?????????
  };

  function createNewRowData() {
    var newData = {
      equipment_f: "??????",
      seq_f: "??????",
      date_f: "??????",
      comment_f: "?????? ???????????? ????????? ????????????~",
      user_f: "?????????",
    };

    return newData;
  }

  // const onAddRow = () => {
  //   var newItem = createNewRowData();
  //   var res = gridOptions.api.updateRowData({ add: [newItem] });

  //   console.log(res);
  // };

  // const onRemoveSelected = () => {
  //   var selectedData = gridOptions.api.getSelectedRows();
  //   var res = gridOptions.api.updateRowData({ remove: selectedData });

  //   console.log(res);
  // };

  return (
    // <div className="dimension">
    //   <div className="grid_shortter_box_with_upperFunction">
    //     <div className="grid_top_area">
    //       <div className="grid_single_line">
    <div className="ag-theme-balham" style={{ height: 300, width: 600 }}>
      {/* <button onClick={gridOptions.onDeleteRow}>??????</button> */}
      {/* <button>??????</button>

      <button>??????</button> */}
      <div>
        <AgGridReact gridOptions={gridOptions1}>
          <AgGridColumn
            field="athlete"
            minWidth={150}
            checkboxSelection={true}
          />
          <AgGridColumn field="age" />
          <AgGridColumn field="country" />
          <AgGridColumn field="sport" />
          <AgGridColumn field="gold" />
        </AgGridReact>
      </div>
      <div>
        <AgGridReact gridOptions={gridOptions2}>
          <AgGridColumn
            field="athlete"
            minWidth={150}
            checkboxSelection={true}
          />
          <AgGridColumn field="age" />
          <AgGridColumn field="country" />
          <AgGridColumn field="sport" />
          <AgGridColumn field="gold" />
        </AgGridReact>
      </div>
    </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //  <div
    //   className="grid_bot_area"
    //   style={{ marginTop: 300, height: 300, width: 600 }}
    // >
    //   <div className="grid_single_line">
  );
};

export default App;
