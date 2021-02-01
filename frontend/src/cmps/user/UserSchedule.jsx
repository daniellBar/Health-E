import React from 'react'

export function UserSchedule({ activities }) {
  let table = []
  for (var i = 0; i < 7; i++) {
    table.push([]);
    for (var j = 0; j < 11; j++) {
      table[i].push('')
    }
  }
  if (activities) {
    activities.forEach(activity => {
      var hour = Math.floor(activity.hour / 2);
      table[activity.dayInWeek - 1][hour] = activity.title;
    })
  }
  return (
    <table className="timetable fs14">
      {table.map((arr, idx) =>
        <tbody
          key={idx}>
          <tr key={idx}
            className="main-info-table">
            {arr.map((title, idx) => <td key={idx} className={(title) ? "yellow" : "white"}>{'' || ''}</td>)}</tr></tbody>)}
    </table>
  )
}
