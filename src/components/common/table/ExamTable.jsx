import { Edit, Visibility } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { StdViewExamEdit, StdViewExamView } from "../../buttonIndex/ButtonComponents";

const ExamTable = (props) => {
  const navigate = useNavigate()
  return (
    <div>
      <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Subject</th>
            <th class="py-3 px-6 text-left">Exam Date</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          {props.options.map((dataSumm, key) => (
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">{dataSumm.exam_subject}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <span>
                    {dataSumm.exam_date == null
                      ? ""
                      : moment(dataSumm.exam_date).format("DD-MM-YYYY")}
                  </span>
                </div>
              </td>
              <td class="py-3 px-6 text-center">
                <span>{dataSumm.exam_status}</span>
              </td>
              <td class="py-3 px-6 text-center">
                <span>
                  {" "}
                  {/* <Tooltip title="Edit Exam" placement="top">
                    <Link to={`/edit-exam/${dataSumm.id}`}>
                      <Edit /> 
                    </Link>
                  </Tooltip> */}
                  <StdViewExamEdit
                    onClick={()=>navigate(`/edit-exam/${dataSumm.id}`)}
                  />
                  {/* <Tooltip title="View Exam" placement="top">
                    <Link to={`/view-exam/${dataSumm.id}`}>
                      <Visibility /> 
                    </Link>
                  </Tooltip> */}
                  <StdViewExamView
                   onClick={()=>navigate(`/view-exam/${dataSumm.id}`)}
                  
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamTable;
