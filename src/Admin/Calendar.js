import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';

const Calendar = () => {
    const [value, setValue] = useState(new Date());
    const [highlightedDays] = useState([1, 2, 13]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="d-flex justify-content-start mt-4">
                <StaticDatePicker
                    variant="static"
                    orientation="portrait"
                    value={value}
                    disableFuture
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => <TextField {...params} className="form-control fs-6" />}
                    renderDay={(day, _value, DayComponentProps) => {
                        const isSelected =
                            !DayComponentProps.outsideCurrentMonth && highlightedDays.indexOf(day.getDate()) >= 0;

                        return (
                            <Badge
                                key={day.toString()}
                                overlap="circular"
                                badgeContent={isSelected ? <CheckIcon color="red" /> : undefined}
                            >
                                <PickersDay
                                    {...DayComponentProps}
                                    className="badge badge-pill badge-primary fs-4"
                                    style={{ fontSize: '20px !important' }}
                                />
                            </Badge>
                        );
                    }}
                />
            </div>
        </LocalizationProvider>
    );
};

export default Calendar;
