import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Typography, Box } from '@material-ui/core';

//lightgrey, slot and timeslot need to be made global
const slotHeight = 120
const lightGrey = '#EEEEEE'
const useStyles = makeStyles((theme) => ({
    timeColumn: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 50
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


function SideTimeColumn() {
    const classes = useStyles();
    return (
        <Box className={classes.timeColumn}>
            {Array.from({ length: 24 }, (_, i) => (
                <Typography className={classes.timeSlot} key={i}>
                {`${moment(i, 'H').format('h a')}`}
                </Typography>
            ))}
        </Box>
    );
  }

export default SideTimeColumn;