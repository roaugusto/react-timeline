import React from 'react'

import Timeline, { ITask } from 'react-timeline'

const dateBase = new Date(2020, 6, 15);
const totPeriods = 6;
const weeksPerPeriods = 1;
const position: 'top' | 'bottom' | 'both' = 'bottom';
const typeDraw: 'inline' | 'rising' = 'rising';
// const labels = ['Concluído', 'Em Desenvolvimento', 'Não Iniciado'];

export const tasks: ITask[] = [
  {
    id: '1',
    startDate: '2020-06-29',
    finishDate: '2020-06-29',
    description: 'Lorem ipsum dolor sit amet, consectetur',
  },
  {
    id: '2',
    startDate: '2020-07-01',
    finishDate: '2020-08-10',
    description: 'Excepteur sint occaecat',
  },
  {
    id: '3',
    startDate: '2020-07-10',
    finishDate: '2020-07-10',
    description: 'Duis aute irure dolor',
  },
  {
    id: '4',
    startDate: '2020-07-06',
    finishDate: '2020-07-15',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: '5',
    startDate: '2020-07-20',
    finishDate: '2020-07-24',
    description: 'Sed ut perspiciatis unde omnis iste natus error',
  },
  {
    id: '6',
    startDate: '2020-08-10',
    finishDate: '2020-08-13',
    description: 'Nemo enim ipsam voluptate',
  },

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
    />
  )

}

export default App
