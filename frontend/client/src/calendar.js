import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CalendarTasks from './calendarComponents/calendarTasks'
import WeekSelector from './calendarComponents/weekSelector';
import CalendarButtonGroup from './calendarComponents/buttonGroup';
import CalendarHeader from './calendarComponents/calendarHeader';
import SideTimeColumn from './calendarComponents/sideTimeColumn';

const lightGrey = '#EEEEEE'
const slotHeight = 120
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1500,
    margin: '0 auto',
    marginTop: theme.spacing(2),
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    fontWeight: 'bold',
    borderBottom: `2px solid ${lightGrey}`,
    padding: theme.spacing(1),
  },
  greyOutline: {
    outline: `2px solid ${lightGrey}`
  },
  dayColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
  redLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTop: `2px solid ${theme.palette.error.main}`,
  },
  dottedredLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTop: `2px dotted ${theme.palette.error.main}`,
  },
  beforedottedredLine: {
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '-5px',
        left: 0,
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: theme.palette.error.main,
      },
  },
  afterdottedredLine: {
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '-5px',
        right: 0,
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: theme.palette.error.main,
      },
  },
  calendarContainer: {
    display: 'flex',
    height: 900,
    overflowY: 'scroll',
  },
  taskBox: {
    position: 'absolute',
    width: '87%',
    marginTop: '3%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderRadius: '10px 10px 10px 10px'
  },
}));

function Calendar({tasks}) {
  const classes = useStyles();
  const [now, setNow] = useState(moment());
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('week'));
  const currentTimeSlotRef = useRef(null);
  const [days, setDays] = useState([]) ;
  
  const minutePercent = (now.minutes() / 60) * 100;

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
  });

  const FindMatchingTask = (date, j) => {
     return tasks.find(task => 
      task.day.isSame(date, 'day') && 
      task.startTime.hour() === j
    );
  }
  return (
        <Box className={classes.container}>
        <Box className={classes.top}>
          <WeekSelector startOfWeek={startOfWeek} setStartOfWeek={setStartOfWeek}/>
          <CalendarButtonGroup setDays={setDays} startOfWeek={startOfWeek} now={now}/>
        </Box>
        <CalendarHeader days={days}/>
        <Box className={classes.calendarContainer}>
            <SideTimeColumn/>
            {days.map((date) => (
              
            <Box className={classes.dayColumn} key={date.format()}>
              {
                Array.from({ length: 24 }, (_, j) => (
                  <Box
                      className={date.day() === days.length - 1? classes.edgeTimeSlot : classes.timeSlot }
                      key={j}
                      ref={now.isSame(date, 'day') && now.hour() === j ? currentTimeSlotRef : null}
                  > {j}
                      {now.isSame(date, 'day') && now.hour() === j && (
                      <Box
                          className={classes.redLine}
                          style={{
                          top: `${minutePercent}%`,
                          
                          }}
                      />
                      )}
                      {now.hour() === j && (
                      <Box
                          className={classes.dottedredLine}
                          style={{
                          top: `${minutePercent}%`,
                          }}
                      />
                      )}     
                        {FindMatchingTask(date, j) && (<CalendarTasks task={FindMatchingTask(date, j)}/>)}
                  </Box>
              ))}
            </Box>
            
            ))}
          </Box>
        </Box>
  );
}

export default Calendar;
