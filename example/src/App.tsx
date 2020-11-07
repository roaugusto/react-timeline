import React from 'react'

import Timeline from 'react-timeline'

import { tasks } from './test/tasks'

const dateBase = new Date(2020, 6, 15);

const App = () => {
  return (

    <>
        <Timeline
          dateBase={dateBase}
          totPeriods={9}
          weeksPerPeriod={1}
          position='both'
          typeDraw='inline'
          tasks={tasks}
          // backgroundColor="#fff"
        />
        <Timeline
          dateBase={dateBase}
          totPeriods={9}
          weeksPerPeriod={1}
          position='top'
          typeDraw='inline'
          tasks={tasks}
          backgroundColor="#fff"
        />
        <Timeline
          dateBase={dateBase}
          totPeriods={9}
          weeksPerPeriod={1}
          position='bottom'
          typeDraw='inline'
          tasks={tasks}
          backgroundColor="#fff"
        />
    </>
  )

}

export default App
