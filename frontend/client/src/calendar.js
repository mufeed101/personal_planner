import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Button, Typography, Box, ButtonGroup, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'; 
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CalendarTasks from './calendarTasks'

const lightGrey = '#EEEEEE'
const slotHeight = 100
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
  header: {
    display: 'flex',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dayHeader: {
    flex: 1,
    width: 50,
    padding: theme.spacing(1),
    borderBottom: `2px solid ${lightGrey};`,
  },
  timeHeader: {
    borderRight: `2px solid ${lightGrey};`,
    padding: theme.spacing(1),
    minWidth: 45,
    borderBottom: `2px solid ${lightGrey};`,
  },
  timeColumn: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 50
  },
  dayColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  timeSlot: {
    flex: 1,
    minHeight: 120,
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
    minHeight: 120,
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
  weekSelector: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(0, 1),
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
  console.log(tasks)
  const classes = useStyles();
  const [now, setNow] = useState(moment());
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('week'));
  const currentTimeSlotRef = useRef(null);
  const [days, setDays] = useState([]) ;
  
  useEffect(() => {
    const sevenDayList = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'));
    setDays(sevenDayList)
  }, [startOfWeek])

  const minutePercent = (now.minutes() / 60) * 100;
  const [selected, setSelected] = React.useState('Week');

  const buttons = ['Day', 'Week', 'Month'];

  const changeFormat = (button) => {
    setSelected(button)
    if(button==='Day'){
      setDays([now])
    }else if(button==='Week'){

      const sevenDayList = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'));
      setDays(sevenDayList)
    }
  }

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
  });

  
  return (
        <Box className={classes.container}>
        <Box className={classes.top}>
            <Box className={classes.weekSelector}>
                <IconButton color="primary" onClick={goPrevWeek} className={classes.greyOutline}>
                <NavigateBeforeIcon/>
                </IconButton>
                <Typography variant="h6">
                {`${startOfWeek.format('MMMM D')} - ${startOfWeek.clone().add(6, 'days').format('MMMM D')}`}
                </Typography>
                <IconButton color="primary" onClick={goNextWeek} className={classes.greyOutline}>
                <NavigateNextIcon/>
                </IconButton>
            </Box>

            <ButtonGroup color="secondary" aria-label="text button group">
                {buttons.map((button, index) => (
                    <Button style={{padding: '5px 15px', margin: '1px'}}
                    variant={selected === button ? 'contained' : 'text'}
                    color={selected === button ? 'primary' : 'default'}
                    onClick={() => changeFormat(button)}
                    className={classes.greyOutline}
                    key={index}
                    >
                    {button}
                    </Button>
                ))}
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
                {`${moment(i, 'H').format('h a')}`}
                </Typography>
            ))}
            </Box>

            {days.map((date) => (
            <Box className={classes.dayColumn} key={date.format()}>
                {
                Array.from({ length: 24 }, (_, j) => (
                  <Box
                      className={date.day() === days.length - 1? classes.edgeTimeSlot : classes.timeSlot }
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

                      {now.isSame(date, 'day') && now.hour() === j && (
                        <Box
                          className={classes.taskBox}
                          style={{
                            height: `150px`,
                            top: `30%`,
                            backgroundColor: '#00FF000F',
                            border: '2px solid #00FF00',
                            }}
                      >run</Box>
                      )}

                      {now.hour() === j && (
                      <Box
                          className={classes.dottedredLine}
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
