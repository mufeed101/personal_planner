import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const lightGrey = '#EEEEEE'
const useStyles = makeStyles((theme) => ({
      greyOutline: {
        outline: `2px solid '#EEEEEE'`
      },
      header: {
        display: 'flex',
        textAlign: 'center',
        fontWeight: 'bold',
      },
      timeHeader: {
        borderRight: `2px solid ${lightGrey};`,
        padding: theme.spacing(1),
        minWidth: 45,
        borderBottom: `2px solid ${lightGrey};`,
      },
      dayHeader: {
        flex: 1,
        width: 50,
        padding: theme.spacing(1),
        borderBottom: `2px solid ${lightGrey};`,
      },
}))


function CalendarHeader({days}) {
    const classes = useStyles();
    return (
        <Box className={classes.header}>
            <Typography className={classes.timeHeader}>
                <AccessTimeIcon/>
            </Typography>
            {days.map((date) => (
            <Typography className={classes.dayHeader} key={date.format()}>
                {date.format('ddd D')}
            </Typography>
            ))}
        </Box>
    );
  }

export default CalendarHeader;