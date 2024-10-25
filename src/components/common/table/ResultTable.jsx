import { Edit, Visibility, WhatsApp, Email } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";

const ResultTable = (props) => {
  return (
    <div>
      <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Course</th>
            <th class="py-3 px-6 text-left">Status</th>
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
                  <span>{dataSumm.exam_status}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-center ">
                <span>
                  <Tooltip title="Edit Result" placement="top">
                    <Link to={`/edit-result/${dataSumm.id}`}>
                      <Edit />
                    </Link>
                  </Tooltip>
                  <Tooltip title="View Exam" placement="top">
                    <Link to={`/view-result/${ dataSumm.id}`}>
                      <Visibility />
                    </Link>
                  </Tooltip>
                  <Tooltip title="Send Email" placement="top">
                    <Email
                      style={{ cursor: "pointer" }}
                      onClick={(e) => props.sendresultEmail(e, dataSumm.id)}
                    />
                  </Tooltip>
                  <Tooltip title="Send Whatsapp" placement="top">
                    <WhatsApp
                      style={{ cursor: "pointer" }}
                      onClick={(e) => props.resultwhatsApp(e)}
                    />
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

export default ResultTable;
