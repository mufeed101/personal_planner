import React, { useState } from "react";
import WeekView from "./calendar";
import moment from 'moment';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Morning Run",
      description: "5k run around the park",
      startTime: moment().hour(10).minute(0),
      endTime: moment().hour(8).minute(30),
      day: moment().dayOfYear(),
    },
    // ... more tasks
  ]);

  return (
    <WeekView tasks={tasks}/>
  );
}

export default App;
