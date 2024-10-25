import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {  NotificationManager,} from "react-notifications";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {baseURL} from '../../api';
import MenuItem from "@material-ui/core/MenuItem";
import moment from 'moment';

const labelBorder = {
  paddingTop:'5px',
  border:'1px solid #4d4b4b',
}

const labelTableSub = {
  width:'15%',
  border: '1px solid black',
}

const labelTableSub1 = {
  width:'40%',
  border: '1px solid black',
}

const labelslabelSpan = {
  fontWeight: '500',
  fontSize: '16px',
  paddingTop:'5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
}

const labelslabel = {
    
  fontSize: '16px',
  fontWeight: '400',
  paddingTop:'5px',
  paddingBottom: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
  height: '30px !important',
  margin: '0px !important',
  color: "rgb(0, 0, 0)",
};

const status = [
  {
    value: "New Enquiry",
    label: "New Enquiry",
  },
  {
    value: "Postponed",
    label: "Postponed",
  },
  {
    value: "In Process",
    label: "In Process",
  },
  {
    value: "Student",
    label: "Student",
  },
  {
    value: "Not Interested Closed",
    label: "Not Interested Closed",
  },
];


const label = {
  color:'blueviolet',
  fontSize:'13px',
  marginBottom:'0px'
}

const span = {
  color:'black',
  fontSize:'16px'
}

const Edit = (props) => {

    let history = useHistory();
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
    const [enquiry, setEnquiry] = useState({
        enquiry_remarks: "",
        enquiry_follow_date: "",
        enquiry_status: ""
    });
    const [followup, setFollowUp] = useState([]);
    useEffect(() => {
      var isLoggedIn = localStorage.getItem("id");
      if(!isLoggedIn){

      window.location = "/signin";
      
      }else{

      }

      axios({
          url: baseURL+"/panel-fetch-enquiry-by-id/" + id,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
          },
        }).then((res) => {
          
          setEnquiry(res.data.enquiry);
          setFollowUp(res.data.followup);
        });
      }, []);

    const onInputChange = (e) => {
        setEnquiry({
        ...enquiry,
        [e.target.name]: e.target.value,
        });  
    };

    const onSubmit = (e) => {
        let data = {
          enquiry_remarks: enquiry.enquiry_remarks,
          enquiry_follow_date: enquiry.enquiry_follow_date,
          enquiry_status: enquiry.enquiry_status,
        };
        
        var url = new URL(window.location.href);
        var id = url.searchParams.get("id");

        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        e.preventDefault();

        if (v) {
        setIsButtonDisabled(true);
        axios({
            url: baseURL+"/panel-update-enquiry/"+id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Enquiry Updated Sucessfully");
                history.goBack();
            }else{
                NotificationManager.error("Duplicate Entry");
                setIsButtonDisabled(false);
            }
            
        });
        }
    };

  return (
    <div className="textfields-wrapper">
      <PageTitleBar title="Edit Enquiry" match={props.match} />
      <RctCollapsibleCard>
        <form id="addIndiv" autoComplete="off">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Enquiry No </label><br/>
                <span style={span}>{enquiry.enquiry_no}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Enquiry Date </label><br/>
                <span style={span}>{moment(enquiry.enquiry_date).format('DD-MM-YYYY')}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Course</label><br/>
                <span style={span}>{enquiry.enquiry_course}</span>
              </div>
            </div>
            {enquiry.enquiry_course == 'Other' && 
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Course Other</label><br/>
                <span style={span}>{enquiry.enquiry_course_other}</span>
              </div>
            </div>
            }
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Source</label><br/>
                <span style={span}>{enquiry.enquiry_source}</span>
              </div>
            </div>
            {enquiry.enquiry_source == 'Other' && 
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Source Other</label><br/>
                <span style={span}>{enquiry.enquiry_source_other}</span>
              </div>
            </div>
            }
          
          <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Full Name</label><br/>
                <span style={span}>{enquiry.enquiry_title}{" "}{enquiry.enquiry_full_name}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Mobile</label><br/>
                <span style={span}>{enquiry.enquiry_country_code}{enquiry.enquiry_mobile}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Email</label><br/>
                <span style={span}>{enquiry.enquiry_email}</span>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>Category</label><br/>
                <span style={span}>{enquiry.enquiry_category}</span>
              </div>
            </div>
            
            <div className="col-sm-12 col-md-12 col-xl-3">
              <div className="form-group">
                <label style={label}>City/Country</label><br/>
                <span style={span}>{enquiry.enquiry_city} - {enquiry.enquiry_country}</span>
              </div>
            </div>
            
          </div>
          <div className="row">
          <div className="col-sm-12 col-md-12 col-xl-3">
            <div className="form-group">
              <TextField
                fullWidth
                required
                label="Status"
                autoComplete="Name"
                name="enquiry_status"
                select
                SelectProps={{
                    MenuProps: {},
                }}
                value={enquiry.enquiry_status}
                onChange={(e) => onInputChange(e)}
                >
                {status.map((statusdata, key) => (
                    <MenuItem key={key} value={statusdata.value}>
                        {statusdata.label}
                    </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-xl-3">
          <div className="form-group">
              <TextField
                fullWidth
                required
                label="New Followup Date"
                type="date"
                autoComplete="Name"
                name="enquiry_follow_date"
                value={enquiry.enquiry_follow_date}
                onChange={(e) => onInputChange(e)}
                />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-xl-6">
              <div className="form-group">
                <TextField
                    fullWidth
                    label="Remarks"
                    multiline
                    required
                    autoComplete="Name"
                    name="enquiry_remarks"
                    value={enquiry.enquiry_remarks}
                    onChange={(e) => onInputChange(e)}
                    />
              </div>
            </div>
          </div>
          
         <div className="row mt-4">
            <div className="col-sm-12 col-md-12 col-xl-12">
                <div className="receiptbuttons" style={{textAlign:'center'}}>
                
                <Link to={"editPersonal?id="+enquiry.id}>
                        <Button className="mr-10 mb-10" color="warning" >
                            Edit Personal
                        </Button>
                    </Link>
                    {(enquiry.enquiry_email != null ? <Button
                    type="submit"
                    className="mr-10 mb-10"
                    color="primary"
                    onClick={(e) => onSubmit(e)}
                    disabled={isButtonDisabled}
                >
                    {isButtonDisabled ? 'Updating...' : 'Update'}
                </Button> :  enquiry.enquiry_status == 'Student' ? '' : <Button
                    type="submit"
                    className="mr-10 mb-10"
                    color="primary"
                    onClick={(e) => onSubmit(e)}
                    disabled={isButtonDisabled}
                >
                    {isButtonDisabled ? 'Updating...' : 'Update'}
                </Button>) 
                    
                    
                     }
                </div>
            </div>
          </div>
          <div className="antifloat"></div>
        </form>
      </RctCollapsibleCard>
      <RctCollapsibleCard>
          <form id="addIndivss" autoComplete="off">
            <div className="d-flex pl-30" style={{justifyContent:'flex-start'}}>
                <div className="address text-center">
                    <h1>FOLLOW UP</h1>
                </div>
            </div>
            {
                followup.length > 0 && (
                    <div className="table-responsive" style={{padding:'20px'}}>
                        <div className="col-md-12 col-12">
                            <table>
                                <thead>
                                    <tr style={labelBorder}>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Followup Date</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Next Followup Date</span>    
                                        </th>      
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Time</span>    
                                        </th>
                                        <th style={labelTableSub}>
                                            <span style={labelslabel}>Type</span>    
                                        </th>
                                        <th style={labelTableSub1}>
                                            <span style={labelslabel}>Description</span>    
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {followup.map((dataSumm, key)=>
                                        <tr style={labelBorder}>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                {(dataSumm.follow_up_date == null ? "" : moment(dataSumm.follow_up_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                {(dataSumm.follow_up_next_date == null ? "" : moment(dataSumm.follow_up_next_date).format('DD-MM-YYYY'))}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.follow_up_time}
                                                </span>
                                            </td>
                                            <td style={labelTableSub}>
                                                <span style={labelslabelSpan}>
                                                  {dataSumm.follow_up_type}
                                                </span>
                                            </td>
                                            <td style={labelTableSub1}>
                                                <span style={labelslabelSpan}>
                                                    {dataSumm.follow_up_sub_type}
                                                </span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
            </form>
            </RctCollapsibleCard>
    </div>
  );
};

export default Edit;
