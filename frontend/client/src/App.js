import React, { useState } from "react";
import WeekView from "./calendar";
import moment from 'moment';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Morning Run",
      description: "5k run around the park",
      startTime: moment().hour(9).minute(45),
      endTime: moment().hour(10).minute(30),
      day: moment("2023-07-06"),
    },

    {
      id: 2,
      title: "Work",
      description: "Work mann",
      startTime: moment().hour(15).minute(0),
      endTime: moment().hour(16).minute(30),
      day: moment("2023-07-03"),
    },
    {
      id: 3,
      title: "Daily standup",
      description: "Work mann",
      startTime: moment().hour(9).minute(0),
      endTime: moment().hour(9).minute(30),
      day: moment("2023-07-07"),
    },
  ]);

  return (
    <WeekView tasks={tasks}/>
  );
}

export default App;
