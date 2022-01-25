import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

const GetTest = () => {
  const [info, setInfo] = useState();

  const loadData = () => {
    fetch("https://33d100fc-f67f-4723-a77c-87e0789f068b.mock.pstmn.io/auth", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setInfo(res));
  };

  console.log(info);
  return (
    <div>
      <Button variant="contained" onClick={loadData}>
        받아오기
      </Button>
    </div>
  );
};

export default GetTest;
