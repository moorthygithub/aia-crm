import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { CircularProgress } from '@mui/material';
import axios from "axios";
import BASE_URL from "../../../base/BaseUrl";


const option = {
  filterType: "textField",
  print: false,
  viewColumns: false,
  filter: false,
  searchOpen: true,
  download: false,
  selectableRows: false,
};

const SelectPopup = (props) => {
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState('');
  const [donorData, setDonorData] = useState([]);
  


  const columnData = [
    "UID",
    "Full Name",
    "Mobile",
    {
      name: "Actions",
      options: {
        filter: true,
        customBodyRender: (value) => (
          <div style={{ minWidth: "150px" }}>
            <button className="text-white  py-1 px-2  bg-gradient-to-b from-[#7c8492] to-[#677080] border-[#677080] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_1px_rgba(0,0,0,0.075)]" onClick={() => addDonorToReceipt(value)}>
              Select
            </button>
          </div>
        ),
      },
    },
  ];

  const addDonorToReceipt = (fts_id) => {
    setMessage(fts_id);
    props.getUserid(fts_id);
  };

  const getData = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/panel-fetch-user-request`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = res.data.useruid;
      const tempRows = response.map((user) => [
        user["user_uid"],
        user["name"],
        user["mobile"],
        user["user_uid"],
      ]);
      setDonorData(tempRows);
    } catch (error) {
      alert("Failed to fetch data");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("id");
    if (!isLoggedIn) {
      window.location = "/signin";
    } else {
      getData();
    }
  }, []);

  return (
    <div className="data-table-wrapper">
      {loader ? (
        <CircularProgress
          disableShrink
          style={{
            marginLeft: "600px",
            marginTop: "300px",
            marginBottom: "300px",
          }}
          color="secondary"
        />
      ) : (
        <div fullBlock>
          {donorData.length > 0 && (
            <MUIDataTable
              data={donorData}
              columns={columnData}
              options={option}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectPopup;
