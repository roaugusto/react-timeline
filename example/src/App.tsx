import React, { useState } from 'react'

import Timeline, { ITask} from 'react-timeline'

import { tasks } from './test/tasks'
import { addDays, format } from 'date-fns'

const dateBase = new Date(2020, 6, 15);

const App = () => {
  const [id, setId] = useState(100)
  const [date1, setNewDate1] = useState(new Date('2020-07-01'))
  const [date2, setNewDate2] = useState(new Date('2020-07-04'))
  const [listTasks, setListTasks] = useState(tasks)

  const handleClick = () => {
    const newId = id + 1
    setId(newId)
    const newDate1 = addDays(date1, 5)
    setNewDate1(newDate1)
    const newDate2 = addDays(date2, 5)
    setNewDate2(newDate2)


    const newTask: ITask = {
      id: newId.toString(),
      startDate: format(date1, 'yyyy-MM-dd'),
      finishDate: format(date2, 'yyyy-MM-dd'),
      description: `Nova tarefa ${newId}`
    }
    console.log('newTask', newTask)
    setListTasks(state => [...state, newTask])

    console.log(listTasks)
  }


  return (

    <>
        <button onClick={handleClick}>add</button>
        <Timeline
          dateBase={dateBase}
          totPeriods={9}
          weeksPerPeriod={1}
          position='both'
          typeDraw='inline'
          tasks={listTasks}
          // backgroundColor="#fff"
        />
    </>
  )

}

export default App
