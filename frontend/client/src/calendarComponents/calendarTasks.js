import {Box} from '@material-ui/core';
import './calendarTasks.css'


function CalendarTask({ task }) {
    const colors = ['00FF00', '017AFF', 'F96300', 'F5C900', 'F34971'];
    const colour = colors[task.id % colors.length]
    const { startTime, endTime } = task;
    const durationInHours = endTime.diff(startTime, 'hours', true);
    const taskBoxHeight = durationInHours * 120;
  
    // Calculate start position as a percentage of the day
    const startHourOfDay = startTime.minute() / 60;
    const topPositionPercent = (startHourOfDay) * 100;

    return (
        <Box
        className="taskBox"
        style={{
          height: `${taskBoxHeight}px`,
          top: `${topPositionPercent}%`,
          backgroundColor: `#${colour}0F`,
          border: `3px solid #${colour}`,
          }}
        >{task.title}
        </Box>
    );
  }

export default CalendarTask;