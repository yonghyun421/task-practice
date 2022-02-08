import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";

import data from "./data.json";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { styled } from "@mui/material/styles";
import { orange, teal } from "@mui/material/colors";
import "./App.css";

const AgnMui = () => {
  const [open, setOpen] = useState(false);
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
    {
      field: "age",
      maxWidth: 90,
      hide: true,
      rowGroup: true,
    },
    { field: "country", minWidth: 150, enableRowGroup: true },
    { field: "sport", minWidth: 150, enableRowGroup: true },
    { field: "gold", enableRowGroup: true },
  ];

  const rowSelected = (e) => {
    console.log(e.node);
    // console.log(e.node["expanded"]);
    // e.node["expanded"] = !e.node["expanded"];
    // setOpen(!open);
  };

  // 일단 현재 탭 누르면 다른 탭은 닫히긴 하는대 모든 행에서 다 반응해서 그부분 수정 필요
  const moreBigger = (e) => {
    console.log(e.node.key * 1);
    // gridOptions.api.forEachNode(function (node) {
    //   if (node.key === e.node.key) {
    //     // && typeof (node.key * 1) === Number
    //     node.setExpanded(true);
    //   } else {
    //     node.setExpanded(false);
    //   }
    // });
  };

  const checkForEmptySevone = (node) => {
    var rowData = node.childrenAfterGroup[0].data;
    if (
      rowData.get("SEVONE_ID") === " " ||
      rowData.get("SEVONE_ID") === "" ||
      rowData.get("SEVONE_ID") === undefined ||
      rowData.get("SEVONE_ID") === null
    ) {
      return true;
    } else {
      return false;
    }
  };

  const gridOptions1 = {
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    autoGroupColumnDef: {
      filterValueGetter: (params) => params.data.country,
    },
    groupDisplayType: "singleColumn",
    animateRows: true,
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
    // rowGroupPanelShow: "always",
    statusBar: {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agTotalRowCountComponent", align: "center" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    },
    onRowClicked: moreBigger,
    rowClassRules: {
      manualExpand: function (params) {
        if (
          params.node.field === "outageName" &&
          params.node.expanded === false
        ) {
          var expandFlag = checkForEmptySevone(params.node);
          return expandFlag;
        }
      },

      expandAll: function (params) {
        if (
          params.node.field === "outageName" &&
          params.node.expanded === true
        ) {
          var expandAllFlag = checkForEmptySevone(params.node);
          return expandAllFlag;
        }
      },
    },
  };

  const gridOptions2 = {
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      resizable: true,
    },
    autoGroupColumnDef: {
      filterValueGetter: (params) => params.data.country,
    },
    groupDisplayType: "singleColumn",
    animateRows: true,
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
    // rowGroupPanelShow: "always",
    statusBar: {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agTotalRowCountComponent", align: "center" },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    },
    onRowClicked: moreBigger,
    rowClassRules: {
      manualExpand: function (params) {
        if (
          params.node.field === "outageName" &&
          params.node.expanded === false
        ) {
          var expandFlag = checkForEmptySevone(params.node);
          return expandFlag;
        }
      },

      expandAll: function (params) {
        if (
          params.node.field === "outageName" &&
          params.node.expanded === true
        ) {
          var expandAllFlag = checkForEmptySevone(params.node);
          return expandAllFlag;
        }
      },
    },
  };

  //   function setRowNodeExpanded(
  //     rowNode: RowNode,
  //     expanded: boolean
  // ): void;

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

  // const onAddRow = () => {
  //   var newItem = createNewRowData();
  //   var res = gridOptions.api.updateRowData({ add: [newItem] });

  //   console.log(res);
  // };

  // const onRemoveSelected = () => {
  //   console.log(gridOptions.api.updateRowData);
  //   var selectedData = gridOptions.api.getSelectedRows();
  //   var res = gridOptions.api.updateRowData({ remove: selectedData });

  //   console.log(res);
  //   // console.log(selectedData);
  // };

  // const removeAll = () => {
  //   gridOptions.api.selectAll();
  //   // 전체 선택
  //   var allData = gridOptions.api.getSelectedRows();

  //   console.log(allData);

  //   var res = gridOptions.api.updateRowData({ remove: allData });
  //   console.log(res);
  // };

  console.log(columnDefs);

  const getSelectedRowData = () => {
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    return selectedData;
  };

  return (
    <div
      className="ag-theme-balham"
      style={{ height: "400px", width: "100vw" }}
    >
      <CancelBtn>추가</CancelBtn>
      <Button>삭제</Button>
      <CancelBtn>전체 삭제</CancelBtn>
      <Button onClick={getSelectedRowData}>선택한 노드</Button>
      <AgGridReact gridOptions={gridOptions1}>
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
      <AgGridReact gridOptions={gridOptions2}>
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
