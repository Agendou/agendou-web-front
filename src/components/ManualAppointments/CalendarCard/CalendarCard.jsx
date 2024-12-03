import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

export default function CustomCalendar({ value, onChange }) {
  dayjs.locale("pt-br");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DemoItem label="">
          <DateCalendar
            value={value}
            onChange={onChange}
            sx={{
              width: "100%",
              height: "100%",
              "& .MuiCalendarPicker-root": {
                width: "100%",
              },
              "& .MuiDayPicker-day": {
                width: "auto",
                color: "#FFF",
              },
              "& .MuiTypography-root": {
                color: "#FFF",
              },
              "& .MuiPickersDay-root": {
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
              "& .MuiPickersArrowSwitcher-button": {
                color: "#FFF",
              },
              "& .MuiPickersCalendarHeader-root": {
                color: "#FFF",
                "& .MuiTypography-root": {
                  color: "#FFF",
                },
              },
              "& .MuiPickersCalendarHeader-iconButton": {
                color: "#FFF",
              },
              "& .MuiPickersDay-dayWithMargin": {
                color: "#FFF",
              },
              "& .MuiPickersYear-yearButton": {
                color: "#FFF",
              },
              "& .MuiPickersCalendarHeader-switchViewIcon": {
                color: "#FFF",
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
