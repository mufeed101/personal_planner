import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Button, Typography, Box, ButtonGroup, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 800,
    margin: '0 auto',
    marginTop: theme.spacing(2),
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.grey[200],
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
  },
  header: {
    display: 'flex',
    backgroundColor: theme.palette.grey[200],
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
  },
  dayHeader: {
    flex: 1,
    width: 50,
    padding: theme.spacing(1),
  },
  timeHeader: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
  },
  timeColumn: {
    display: 'flex',
    flexDirection: 'column',
    width: 50,
  },
  dayColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  timeSlot: {
    flex: 1,
    minHeight: 50,
    borderTop: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTop: `2px solid ${theme.palette.error.main}`,
  },
  weekSelector: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(0, 1),
    },
  },
  calendarContainer: {
    display: 'flex',
    height: 600,
    overflowY: 'scroll',
  },
}));

function Calendar() {
  const classes = useStyles();
  const [now, setNow] = useState(moment());
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('week'));
  const currentTimeSlotRef = useRef(null);
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'));

  const minutePercent = (now.minutes() / 60) * 100;

  const goNextWeek = () => {
    setStartOfWeek(startOfWeek.clone().add(1, 'week'));
  };

  const goPrevWeek = () => {
    setStartOfWeek(startOfWeek.clone().subtract(1, 'week'));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentTimeSlotRef.current && now.isSame(startOfWeek, 'week')) {
      currentTimeSlotRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [now, startOfWeek]);

  return (
    <Box className={classes.container}>
    <Box className={classes.top}>
        <Box className={classes.weekSelector}>
            <IconButton color="primary" onClick={goPrevWeek}>
            <ArrowBackIosIcon />
            </IconButton>
            <Typography variant="h6">
            {`${startOfWeek.format('MMMM D')} - ${startOfWeek.clone().add(6, 'days').format('MMMM D')}`}
            </Typography>
            <IconButton color="primary" onClick={goNextWeek}>
            <ArrowForwardIosIcon/>
            </IconButton>
        </Box>

        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button>Day</Button>
            <Button>Week</Button>
            <Button>Month</Button>
        </ButtonGroup>
    </Box>


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

      <Box className={classes.calendarContainer}>
        <Box className={classes.timeColumn}>
          {Array.from({ length: 24 }, (_, i) => (
            <Typography className={classes.timeSlot} key={i}>
              {`${i}:00`}
            </Typography>
          ))}
        </Box>

        {days.map((date) => (
          <Box className={classes.dayColumn} key={date.format()}>
            {Array.from({ length: 24 }, (_, j) => (
              <Box
                className={classes.timeSlot}
                key={j}
                ref={now.isSame(date, 'day') && now.hour() === j ? currentTimeSlotRef : null}
              >
                {now.isSame(date, 'day') && now.hour() === j && (
                  <Box
                    className={classes.redLine}
                    style={{
                      top: `${minutePercent}%`,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Calendar;
