import React, { ChangeEvent, useState } from 'react'

import Timeline, { ITask} from 'react-timeline'

import { tasks } from './test/tasks'

import { addDays, format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const App = () => {
  const [id, setId] = useState(100);
  const [date1, setNewDate1] = useState(new Date('2020-11-01'));
  const [date2, setNewDate2] = useState(addDays(new Date('2020-11-01'), 3));
  const [listTasks, setListTasks] = useState(tasks);

  const [dateBasePreview, setDateBasePreview] = useState<Date>(new Date());
  const [periods, setPeriods] = useState(9);
  const [weeks, setWeeks] = useState(1);
  const [position, setPosition] = useState<'both' | 'top' | 'bottom'>('both');
  const [typeDraw, setTypeDraw] = useState<'rising' | 'inline'>('inline');
  const [background, setBackground] = useState('#f0f0f5');

  const handleClick = (): void => {
    const newId = id + 1;
    setId(newId);
    const newDate1 = addDays(date1, 3);
    setNewDate1(newDate1);
    const newDate2 = addDays(date2, 3);
    setNewDate2(newDate2);

    const newTask: ITask = {
      id: newId.toString(),
      startDate: format(date1, 'yyyy-MM-dd'),
      finishDate: format(date2, 'yyyy-MM-dd'),
      description: `Nova tarefa ${newId}`,
    };
    setListTasks((state) => [...state, newTask]);
  };

  const handleDateBase = (date: Date): void => {
    if (!date) return;
    setDateBasePreview(date);
  };

  const handlePeriod = (e: ChangeEvent<HTMLSelectElement>): void => {
    setPeriods(Number(e.target.value));
  };
  const handleWeeks = (e: ChangeEvent<HTMLSelectElement>): void => {
    setWeeks(Number(e.target.value));
  };
  const handlePosition = (e: ChangeEvent<HTMLSelectElement>): void => {
    let pos: 'both' | 'top' | 'bottom' = 'both';

    switch (e.target.value) {
      case 'both':
        pos = 'both';
        break;
      case 'top':
        pos = 'top';
        break;
      case 'bottom':
        pos = 'bottom';
        break;
      default:
        pos = 'both';
        break;
    }
    setPosition(pos);
  };
  const handleDrawType = (e: ChangeEvent<HTMLSelectElement>): void => {
    let tpDraw: 'rising' | 'inline' = 'inline';

    switch (e.target.value) {
      case 'rising':
        tpDraw = 'rising';
        break;
      case 'inline':
        tpDraw = 'inline';
        break;
      default:
        tpDraw = 'inline';
        break;
    }
    setTypeDraw(tpDraw);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', margin: 40 }}>
        <div style={{ marginLeft: 10, color: '#737373', zIndex: 99999 }}>
          <ReactDatePicker
            dateFormat="dd/MM/yyyy"
            placeholderText="Data Base"
            selected={dateBasePreview}
            onChange={handleDateBase}
          />
        </div>

        <div style={{ marginLeft: 10, color: '#737373' }}>
          Qty periods:
          <select value={periods} onChange={handlePeriod}>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div style={{ marginLeft: 10, color: '#737373' }}>
          Weeks Per Period:
          <select value={weeks} onChange={handleWeeks}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div style={{ marginLeft: 10, color: '#737373' }}>
          Position:
          <select value={position} onChange={handlePosition}>
            <option value="both">both</option>
            <option value="top">top</option>
            <option value="bottom">bottom</option>
          </select>
        </div>
        <div style={{ marginLeft: 10, color: '#737373' }}>
          Drawing type:
          <select value={typeDraw} onChange={handleDrawType}>
            <option value="inline">inline</option>
            <option value="rising">rising</option>
          </select>
        </div>
        <div style={{ marginLeft: 10, color: '#737373' }}>
          Background:
          <select
            value={background}
            onChange={(e) => setBackground(e.target.value)}
          >
            <option value="#f0f0f5">#f0f0f5</option>
            <option value="#fff">#fff</option>
          </select>
        </div>
        <button
          style={{ paddingLeft: 10, paddingRight: 10, marginLeft: 10 }}
          type="button"
          onClick={handleClick}
        >
          Add new activity
        </button>
      </div>
      <Timeline
        dateBase={dateBasePreview}
        totPeriods={periods}
        weeksPerPeriod={weeks}
        position={position}
        typeDraw={typeDraw}
        tasks={listTasks}
        backgroundColor={background}
      />
    </>
  );

}

export default App
