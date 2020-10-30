import React from 'react';
import { GoCheck, GoPrimitiveDot } from 'react-icons/go';

import { format, parseISO, isAfter } from 'date-fns';

import {
  DayBar,
  DescDay,
  DayTask,
  MarginDay,
  DescTask,
  TaskContent,
} from './styles';

interface TaskProps {
  dateBase: Date;
  startDate: string;
  finishDate: string;
  description: string;
  position: number;
  qtyDays: number;
  widthDay: number;
  widthBar: number;
  type: 'completed' | 'inprogress' | 'planned';
  taskPosition: 'top' | 'bottom';
}

const Task: React.FC<TaskProps> = ({
  dateBase,
  startDate,
  finishDate,
  description,
  position,
  qtyDays,
  widthDay,
  widthBar,
  type,
  taskPosition,
}) => {
  return (
    <TaskContent width={widthDay}>
      <DayTask position={position} taskPosition={taskPosition}>
        <DescDay>
          {qtyDays > 1
            ? `${format(parseISO(startDate), 'dd/MM')} -
              ${format(parseISO(finishDate), 'dd/MM')}`
            : format(parseISO(startDate), 'dd/MM')}
        </DescDay>

        <DayBar type={type} width={widthDay * widthBar} text={qtyDays > 1}>
          {qtyDays > 1 ? `${qtyDays} dias` : <span> </span>}
        </DayBar>
        <DescTask>
          {isAfter(parseISO(finishDate), dateBase) ? (
            <GoPrimitiveDot />
          ) : (
            <GoCheck />
          )}
          {description}
        </DescTask>
      </DayTask>
      <MarginDay position={position} type={type} taskPosition={taskPosition} />
    </TaskContent>
  );
};

export default Task;
