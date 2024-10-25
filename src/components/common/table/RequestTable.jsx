import moment from "moment";

const RequestTable = (props) => {
  return (
    <div>
      <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Request Date</th>
            <th class="py-3 px-6 text-left">Request For</th>
            <th class="py-3 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          {props.options.map((dataSumm, key) => (
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">
                  {(dataSumm.course_request_date == null ? "" : moment(dataSumm.course_request_date).format('DD-MM-YYYY'))}
                  </span>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <span>
                  {dataSumm.course_request}
                  </span>
                </div>
              </td>
              <td class="py-3 px-6 text-center">
                <span> {dataSumm.course_request_status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
