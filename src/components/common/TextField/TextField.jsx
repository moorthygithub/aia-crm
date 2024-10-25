import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { Input } from "@material-tailwind/react";

const Fields = (props) => {
  return (
    <>
      {props.type === "textField" && (
        <>
          <Input
            label={props.title}
            required={props.required === true || props.required === "true"}
            multiline={props.multiline === true || props.multiline === "true"}
            name={props.name}
            type={props.types}
            autoComplete={props.autoComplete}
            value={props.value}
            onChange={props.onChange}
            onClick={props.onClick}
            placeholder={props.placeholder}
            {...props}
          />
        </>
      )}
      {props.type === "fileUpload" && (
        <>
          <Input
            label={props.title}
            required={props.required === true || props.required === "true"}
            name={props.name}
            type="file"
            autoComplete={props.autoComplete}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            {...props}
          />
        </>
      )}

      {props.type === "dropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.refer_by}>
                  {data.refer_by}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "locationDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "serviceDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.id}>
                  {data.service}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "multiSelectDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value} // Ensure this is an array for multi-select
              label={props.title}
              onChange={props.onchange}
              multiple // Enables multi-select
              renderValue={(selected) => selected.join(", ")} // Renders selected values
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.service}>
                  <Checkbox checked={props.value === data.service} />
                  <ListItemText primary={data.service} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "branchDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.id}>
                  {data.branch_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "whatsappDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} {props.required ? <span className="text-red-700">*</span> : null } 
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.value}>
                  {data.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "subServiceDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.id}>
                  {data.service_sub}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "priceforDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.country_name}>
                  {data.country_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "deliverymodeDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.deliverymode}>
                  {data.deliverymode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "countryDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.id}>
                  {data.service_price_for} - {data.service_price_rate}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "courseDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.courses_name}>
                  {data.courses_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "studentDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.user_uid}>
                  {data.user_uid + " - " + data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "requestDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.user_request_type}>
                  {data.user_request_type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
      {props.type === "employeeDropdown" && (
        <>
          <FormControl fullWidth>
            <InputLabel id="service-select-label">
              <span className="text-sm relative bottom-[6px]">
                {props.title} <span className="text-red-700">*</span>
              </span>
            </InputLabel>
            <Select
              sx={{ height: "40px", borderRadius: "5px" }}
              labelId="service-select-label"
              id="service-select"
              name={props.name}
              value={props.value}
              label={props.title}
              onChange={props.onchange}
              {...props}
              required={props.required === true || props.required === "true"}
              disabled={props.disabled === true || props.disabled === "true"}
            >
              {props.options?.map((data, key) => (
                <MenuItem key={key} value={data.id}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
};

export default Fields;
