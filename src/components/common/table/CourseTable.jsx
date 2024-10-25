import moment from "moment";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CourseTable = (props) => {
  return (
    <div>
      <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Courses</th>
            <th class="py-3 px-6 text-left">Validity</th>
            <th class="py-3 px-6 text-center">Expire Date</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Onboarding / Offboarding</th>
            <th class="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          {props.options.map((dataSumm, key) => (
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{dataSumm.course_opted}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <span>{dataSumm.course_validity}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-center">
                <span>
                  {" "}
                  {dataSumm.course_expiry_date == null
                    ? ""
                    : moment(dataSumm.course_expiry_date).format("DD-MM-YYYY")}
                </span>
              </td>
              <td class="py-3 px-6 text-center">
                <span> {dataSumm.course_status}</span>
              </td>
              <td class="py-3 px-6 text-center">
                <span>{dataSumm.student_status}</span>
              </td>
              <td class="py-3 px-6 text-center">
                <span>
                  <Tooltip title="Edit Course" placement="top">
                    <Link to={`/edit-student-course/${dataSumm.id}`}>
                     <EditIcon />  
                    </Link>
                  </Tooltip>
                  <Tooltip  title="View Course" placement="top">
                    <Link to={`/view-course/${dataSumm.id}`}>
                      <VisibilityIcon /> 
                    </Link>
                  </Tooltip>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
