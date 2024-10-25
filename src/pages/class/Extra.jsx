import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import MUIDataTable from "mui-datatables";
import Moment from 'moment';

const label = {
    color:'blueviolet',
    fontSize:'13px',
    marginBottom:'0px'
}
  
const span = {
    color:'black',
    fontSize:'16px'
}

const Add = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [classes, setClass] = useState({});
    const [students, setStudents] = useState([]);
  
    useEffect(() => {
        var isLoggedIn = localStorage.getItem("id");
        if(!isLoggedIn){
  
        window.location = "/signin";
        
        }else{
  
        }
  
        axios({
            url: baseURL+"/panel-fetch-class-by-id/" + id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setClass(res.data.class);
            setStudents(res.data.student)
          });
    }, []);

    const columns = ["UID No", "Full Name", "Mobile", "Email"];

    const options = {
        filterType: 'dropdown',
        filter: true,
        search: true,
        print: false,
        viewColumns: false,
        download:false,
        selectableRows: true,
        selectToolbarPlacement:"above",
        isRowSelectable: (dataIndex, selectedRows, data) => {
         return (
            students[dataIndex].name == "Allotted" ? false: true)
         
       },
        selectableRowsOnClick: true,
        
        onRowsSelect : (currentRowSelected, allRowsSelected ) => {
         
            var tempvalue = allRowsSelected.map(row => row.dataIndex);

            var new_id=[];

            for(var i=0;i<tempvalue.length;i++){                
              new_id.push(students[tempvalue[i]]["user_uid"]);              
            }

            localStorage.setItem("selectedUserIds", new_id+'');

        },
        customToolbarSelect: () => {},
    };

    const onSubmit = (e) => {
        var schoolIdsSelected =  localStorage.getItem("selectedUserIds");
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");
        let data = {
            class_id: id,
            user_uid: schoolIdsSelected,
        };
        
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/panel-create-attendance",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Attendance Added Sucessfully");
                history.push("listing");
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

    const onBack = (e) =>{
        e.preventDefault();
        history.push(`/app/class`);
    }

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Add Attendance" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <label style={label}>Course </label><br/>
                    <span style={span}>{classes.class_subject}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <label style={label}>Date </label><br/>
                    <span style={span}>{Moment(classes.class_date).format('DD-MM-YYYY')}</span>
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-4">
                <div className="form-group">
                    <label style={label}>Time </label><br/>
                    <span style={span}>{classes.class_time}</span>
                </div>
            </div>
        </div>
        <MUIDataTable 
            title={"Student List"}
            data={students.map(item => {
                 
                return [
                  item.user_uid,
                  item.name,
                  item.mobile,
                  item.email
                  
                ]
              })}
              columns={columns} 
              options={options} 
            />
        <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                    <Button
                        type="submit"
                        className="mr-10 mb-10"
                        color="primary"
                        onClick={(e) => onSubmit(e)}
                        disabled={isButtonDisabled}
                    >
                        {isButtonDisabled ? 'Submiting...' : 'Submit'}
                    </Button>
                    
                        <Button onClick={(e) =>onBack(e)} className="mr-10 mb-10" color="success">
                            Back
                        </Button>
                    
                </div>
            </div>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
    </div>
  );
};

export default Add;
