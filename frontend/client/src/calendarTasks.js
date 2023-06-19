function calendarTask({ task }) {
    return (
      <div style={{ position: 'absolute', top: task.startTime.minute() + '%', bottom: 100 - task.endTime.minute() + '%' }}>
        <p>{task.title}</p>
        <p>{task.description}</p>
      </div>
    );
  }

export default calendarTask;