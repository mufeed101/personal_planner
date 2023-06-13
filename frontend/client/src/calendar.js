import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div`
  display: flex;
  background-color: #f0f0f0;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
`;

const CalendarContainer = styled.div`
  display: flex;
  height: 600px;
  overflow-y: scroll;
`;

const DayColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
`;

const DayHeader = styled.div`
  padding: 5px;
  flex: 1;
  border-left: 1px solid #ccc;
`;

const TimeHeader = styled(DayHeader)`
  flex: 0 0 41px;
`;

const TimeSlot = styled.div`
  flex: 1;
  min-height: 100px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding: 5px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    border-top: 2px solid transparent;
    top: ${props => props.isCurrentHour ? `${props.minutePercent}%` : 'unset'};
    border-color: ${props => props.isCurrentHour ? 'red' : 'transparent'};
  }
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 50px;
  border-right: 1px solid #ccc;
`;

function Calendar() {
  const startOfWeek = moment().startOf('week');
  const days = Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'day'));
  const currentTimeSlotRef = useRef(null);

  useEffect(() => {
    setTimeout(() => currentTimeSlotRef.current.scrollIntoView({ behavior: 'smooth' }), 500);
  }, []);

  const now = moment();
  const minutePercent = (now.minutes() / 60) * 100;

  return (
    <Container>
      <HeaderRow>
        <TimeHeader style={{borderLeft: 'none'}}>Time</TimeHeader>
        {days.map((date, i) => (
          <DayHeader key={i}>{date.format('dddd, MMMM Do')}</DayHeader>
        ))}
      </HeaderRow>
      <CalendarContainer>
        <TimeColumn>
          {Array.from({ length: 24 }, (_, j) => (
            <TimeSlot key={j} style={{borderLeft: 'none'}}>
              {j}:00
            </TimeSlot>
          ))}
        </TimeColumn>
        {days.map((date, i) => (
          <DayColumn key={i}>
            {Array.from({ length: 24 }, (_, j) => (
              <TimeSlot 
                key={j} 
                isCurrentHour={now.hour() === j}
                minutePercent={now.hour() === j ? minutePercent : 0}
                ref={now.isSame(date, 'day') && now.hour() === j ? currentTimeSlotRef : null}
              />
            ))}
          </DayColumn>
        ))}
      </CalendarContainer>
    </Container>
  );
}

export default Calendar
