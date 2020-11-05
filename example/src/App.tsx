import React from 'react'

import Timeline, { ITask } from 'react-timeline'

const dateBase = new Date(2020, 9, 31);
const totPeriods = 9;
const weeksPerPeriods = 1;
const position: 'top' | 'bottom' | 'both' = 'both';
const typeDraw: 'inline' | 'rising' = 'inline';
// const labels = ['Concluído', 'Em Desenvolvimento', 'Não Iniciado'];

export const tasks: ITask[] = [
  {
    id: "1",
    startDate: "2020-10-19",
    finishDate: "2020-11-02",
    description: "Sprint 1"
  },
  {
    id: "2",
    startDate: "2020-11-02",
    finishDate: "2020-11-15",
    description: "Sprint 2"
  },
  {
    id: "3",
    startDate: "2020-11-16",
    finishDate: "2020-11-29",
    description: "Sprint 3"
  },
  {
    id: "4",
    startDate: "2020-11-30",
    finishDate: "2020-12-13",
    description: "Sprint 4"
  }
];


const App = () => {
  return (
    <Timeline
      dateBase={dateBase}
      totPeriods={totPeriods}
      weeksPerPeriod={weeksPerPeriods}
      position={position}
      typeDraw={typeDraw}
      // locale={ptBR}
      // labels={labels}
      tasks={tasks}
      daysLabel="dias"
    />
  )

}

export default App
