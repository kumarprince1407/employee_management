//Date.jsx
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function Date({ value, onChange }) {
  const validDate = value ? dayjs(value) : null; //Convert to a valid date or null

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={4} sx={{ width: "50vu" }}>
          {/* renderInput prop controls the element which is displayed as date picker  */}
          <DatePicker
            renderInput={(params) => <TextField {...params} />}
            value={validDate}
            sx={{ width: "60%" }}
            onChange={onChange}
          />
        </Stack>
      </LocalizationProvider>
    </React.Fragment>
  );
}

export default Date;
