import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";

import data from "./data.json";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { styled } from "@mui/material/styles";
import { orange, teal } from "@mui/material/colors";

const AgnMui = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(data);

  const columnDefs = [
    {
      field: "athlete",
      minWidth: 150,
      checkboxSelection: true,
      enableRowGroup: true,
    },
    { field: "age", maxWidth: 90, enableRowGroup: true, rowGroup: true },
    { field: "country", minWidth: 150, enableRowGroup: true },
    { field: "sport", minWidth: 150, enableRowGroup: true },
    { field: "gold", enableRowGroup: true },
  ];

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      editable: true,
    },
    columnDefs: columnDefs,
    rowData: null,
    onGridReady: function (params) {
      setTimeout(function () {
        params.api.setRowData(data);
      }, 2000);
    },
    // rowSelection: "multiple",
    // suppressDragLeaveHidesColumns: true,
    // suppressMakeColumnVisibleAfterUnGroup: true,
    rowGroupPanelShow: "always",
    statusBar: {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agTotalRowCountComponent", align: "center" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    },
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
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
    console.log(gridOptions.api.updateRowData);
    var selectedData = gridOptions.api.getSelectedRows();
    var res = gridOptions.api.updateRowData({ remove: selectedData });

    console.log(res);
    // console.log(selectedData);
  };

  const removeAll = () => {
    gridOptions.api.selectAll();
    // 전체 선택
    var allData = gridOptions.api.getSelectedRows();

    console.log(allData);

    var res = gridOptions.api.updateRowData({ remove: allData });
    console.log(res);
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "500px", width: "100vw" }}
    >
      <CancelBtn onClick={onAddRow}>추가</CancelBtn>
      <Button onClick={onRemoveSelected}>삭제</Button>
      <CancelBtn onClick={removeAll}>전체 삭제</CancelBtn>
      <AgGridReact gridOptions={gridOptions}>
        {/* <AgGridColumn
          field="athlete"
          minWidth={150}
          checkboxSelection={true}
          enableRowGroup={true}
        />
        <AgGridColumn field="age" enableRowGroup={true} rowGroup={true} />
        <AgGridColumn field="country" enableRowGroup={true} />
        <AgGridColumn field="sport" enableRowGroup={true} />
        <AgGridColumn field="gold" enableRowGroup={true} /> */}
      </AgGridReact>
    </div>
  );
};

export default AgnMui;

// mui 이용해서 기존 Button 컴포넌트 CSS 수정해서 사용하기
const CancelBtn = styled(Button)(({ theme }) => ({
  backgroundColor: orange[700],
  color: teal[700],
}));
