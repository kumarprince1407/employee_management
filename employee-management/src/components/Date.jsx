//Date.jsx
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Date() {
  //   const [selectedDate, setSelectedDate] = (useState < Date) | (null > null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={4} sx={{ width: "50vu" }}>
          {/* renderInput prop controls the element which is displayed as date picker  */}
          <DatePicker
            renderInput={(params) => <TextField {...params} />}
            value={selectedDate}
            sx={{ width: "60%" }}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
          />
        </Stack>
      </LocalizationProvider>
    </React.Fragment>
  );
}

export default Date;
