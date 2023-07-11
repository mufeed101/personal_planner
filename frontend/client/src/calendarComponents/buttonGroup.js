import React, {useEffect} from 'react';
import { Button, ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
      greyOutline: {
        outline: `2px solid '#EEEEEE'`
      },
}))


function CalendarButtonGroup({setDays, startOfWeek, now}) {
    const classes = useStyles();
    const buttons = ['Day', 'Week', 'Month'];
    const [selected, setSelected] = React.useState('Week');

    useEffect(() => {
        const sevenDayList = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'));
        setDays(sevenDayList)
      }, [startOfWeek])

    const changeFormat = (button) => {
        setSelected(button)
        if(button==='Day'){
            setDays([now])
        }else if(button==='Week'){
            const sevenDayList = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'));
            setDays(sevenDayList)
        }
    }

    return (
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

    );
  }

export default CalendarButtonGroup;