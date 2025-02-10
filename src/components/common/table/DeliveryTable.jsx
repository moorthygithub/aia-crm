import { Edit, Visibility, WhatsApp } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { StdViewDeliveryEdit, StdViewDeliveryView, StdViewDeliveryWhatsapp } from "../../buttonIndex/ButtonComponents";

const DeliveryTable = (props) => {
  const navigate = useNavigate()
  return (
    <div>
      <table class="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Slip Shared</th>
            <th class="py-3 px-6 text-left">Mode</th>
            <th class="py-3 px-6 text-center">Tracking Number</th>
            <th class="py-3 px-6 text-center">Shipping Date</th>
            <th class="py-3 px-6 text-center">Delivery Date</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          {props.options.map((dataSumm, key) => (
            <tr class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <span class="font-medium">
                    {dataSumm.delivery_slip_shared}
                  </span>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <span>{dataSumm.delivery_mode}</span>
                </div>
              </td>
              <td class="py-3 px-6 text-center">
                <span> {dataSumm.delivery_tracking_number}</span>
              </td>
              <td class="py-3 px-6 text-center">
                <span>
                  {dataSumm.delivery_shipping_date == null
                    ? ""
                    : moment(dataSumm.delivery_shipping_date).format(
                        "DD-MM-YYYY"
                      )}
                </span>
              </td>
              <td class="py-3 px-6 text-center">
                <span>
                  {" "}
                  {dataSumm.delivery_date == null
                    ? ""
                    : moment(dataSumm.delivery_date).format("DD-MM-YYYY")}
                </span>
              </td>
              <td class="py-3 px-6 text-center">
                <span>{dataSumm.delivery_status}</span>
              </td>
              <td class="py-3 px-6 text-center">
                <div class="flex item-center justify-center">
                  {/* <Tooltip title="Edit Delivery" placement="top">
                    <Link to={`/edit-student-delivery/${dataSumm.id}`}>
                      <Edit />
                    </Link>
                  </Tooltip> */}
                  <StdViewDeliveryEdit
                   onClick={()=>navigate(`/edit-student-delivery/${dataSumm.id}`)}
                  
                  />
                  {/* <Tooltip title="View Delivery" placement="top">
                    <Link to={`/view-delivery/${dataSumm.id}`}>
                      <Visibility />
                    </Link>
                  </Tooltip> */}
                  <StdViewDeliveryView
                   onClick={()=>navigate(`/view-delivery/${dataSumm.id}`)}
                  
                  />
                  {/* <Tooltip title="Send Whatsapp" placement="top">
                    <WhatsApp
                      style={{ cursor: "pointer" }}
                      onClick={(e) => props.deliverywhatsApp(e, dataSumm.id)}
                    />
                  </Tooltip> */}

                  <StdViewDeliveryWhatsapp
                       onClick={(e) => props.deliverywhatsApp(e, dataSumm.id)}
                  
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryTable;
