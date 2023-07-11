import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const lightGrey = '#EEEEEE'
const useStyles = makeStyles((theme) => ({
    edgeTimeSlot: {
        flex: 1,
        minHeight: slotHeight,
        borderTop: `2px solid ${lightGrey}`,
        padding: theme.spacing(1),
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    timeSlot: {
        flex: 1,
        minHeight: slotHeight,
        borderTop: `2px solid ${lightGrey}`,
        borderRight: `2px solid ${lightGrey}`, 
        padding: theme.spacing(1),
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
}))


function CalendarHeader({date, days, now}) {
    const classes = useStyles();
    return (
        <Box
            className={date.day() === days.length - 1? classes.edgeTimeSlot : classes.timeSlot }
            key={j}
            ref={now.isSame(date, 'day') && now.hour() === j ? currentTimeSlotRef : null}
        > {j}
        
        </Box>
    );
  }

export default CalendarHeader;