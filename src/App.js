import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import data from "./data.json";

import "ag-grid-enterprise";
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

  var gridOptions = {
    defaultColDef: {
      resizable: true,

      sortable: true,
    },

    columnDefs: columnDefs,

    rowData: null,
    onGridReady: function (params) {
      setTimeout(function () {
        params.api.setRowData(data);
      }, 2000);
    },

    rowSelection: "multiple", //추가한 코드. multiple 설정안하면 행 선택이 안되고 하나의 셀이 선택 되어 삭제가 불가능
  };

  function createNewRowData() {
    var newData = {
      equipment_f: "기타",
      seq_f: "날짜",
      date_f: "내용",
      comment_f: "추가 버튼으로 생성된 행입니다~",
      user_f: "작성자",
    };

    return newData;
  }

  const onAddRow = () => {
    var newItem = createNewRowData();
    var res = gridOptions.api.updateRowData({ add: [newItem] });

    console.log(res);
  };

  const onRemoveSelected = () => {
    var selectedData = gridOptions.api.getSelectedRows();
    var res = gridOptions.api.updateRowData({ remove: selectedData });

    console.log(res);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      {/* <button onClick={gridOptions.onDeleteRow}>삭제</button> */}
      <button onClick={onAddRow}>추가</button>

      <button onClick={onRemoveSelected}>삭제</button>
      <AgGridReact gridOptions={gridOptions}>
        <AgGridColumn field="athlete" minWidth={150} checkboxSelection={true} />
        <AgGridColumn field="age" />
        <AgGridColumn field="country" />
        <AgGridColumn field="sport" />
        <AgGridColumn field="gold" />
      </AgGridReact>
    </div>
  );
};

export default App;
