import React, { Fragment } from 'react';

import {
  startOfWeek,
  addDays,
  subDays,
  differenceInDays,
  format,
  isEqual,
  parseISO,
  isAfter,
} from 'date-fns';

import { enUS } from 'date-fns/locale';
import { Locale } from 'date-fns';
import GlobalStyle from './styles/global';

import {
  Container,
  Content,
  Square,
  SubtitleStyled,
  TimelineStyled,
  Item,
  ItemDiv,
  MarginMonth,
  MonthLabel,
  DayEvolution,
  DayEvolutionLabel,
  DayLabel,
  FirstMonthLabel,
  DayTaskEmpty,
  RowStyled,
} from './styles';

import Task from './components/Task';

export interface ITask {
  id: string;
  startDate: string;
  finishDate: string;
  description: string;
}

interface ITaskFormatted {
  id: string;
  startDate: string;
  finishDate: string;
  description: string;
  qtyDays: number;
  widthBar: number;
  type: 'completed' | 'inprogress' | 'planned';
}

export interface ITimeline {
  dateBase: Date;
  totPeriods: number;
  weeksPerPeriod: number;
  position: 'top' | 'bottom' | 'both';
  tasks: ITask[];
  typeDraw: 'inline' | 'rising';
  locale?: Locale;
  labels?: string[];
}

const Timeline: React.FC<ITimeline> = ({
  dateBase,
  totPeriods,
  weeksPerPeriod,
  position,
  tasks,
  typeDraw,
  locale,
  labels,
}) => {
  const currentLocale = locale || enUS;
  const currentLabels = labels || [
    'Finished',
    'Under Development',
    'Not Started',
  ];

  const daysPerPeriods = weeksPerPeriod * 7;
  const widthDay = 17 / weeksPerPeriod;

  const firstMon = addDays(startOfWeek(dateBase), 1);
  const firstDate = subDays(startOfWeek(firstMon), 27 * weeksPerPeriod);
  let line = 0;
  let line2 = 0;

  const datesBase: Date[] = [];
  const rangeDates: Date[] = [];

  const tasks1: ITask[] = [];
  const tasks2: ITask[] = [];

  switch (position) {
    case 'both':
      for (let i = 0; i < tasks.length; i++) {
        if (i % 2 === 0) {
          tasks1.push(tasks[i]);
        } else {
          tasks2.push(tasks[i]);
        }
      }
      break;
    case 'top':
      for (let i = 0; i < tasks.length; i++) {
        tasks1.push(tasks[i]);
      }
      break;
    case 'bottom':
      for (let i = 0; i < tasks.length; i++) {
        tasks2.push(tasks[i]);
      }
      break;
    default:
      for (let i = 0; i < tasks.length; i++) {
        if (i % 2 === 0) {
          tasks1.push(tasks[i]);
        } else {
          tasks2.push(tasks[i]);
        }
      }
      break;
  }

  let date = firstDate;
  datesBase.push(date);
  for (let i = 1; i <= totPeriods; i++) {
    const newDate = addDays(date, daysPerPeriods);
    datesBase.push(newDate);
    date = newDate;
  }
  // console.log('datesBase', datesBase);

  const diff = differenceInDays(dateBase, firstDate);
  const totEvol = `${widthDay * diff + 4}px`;

  const lastDate = addDays(datesBase[datesBase.length - 1], daysPerPeriods);
  const lastDrawingDate = addDays(lastDate, 4);
  // console.log('lastDate', lastDate);
  const diffTotal = differenceInDays(lastDate, firstDate) + 1;

  let newDate = firstDate;
  for (let i = 1; i < diffTotal; i++) {
    rangeDates.push(newDate);
    newDate = addDays(newDate, 1);
  }

  const nextDate = (qtyDays: number): Date => {
    return addDays(firstDate, qtyDays);
  };

  const formatTask = (listTasks: ITask[]): ITaskFormatted[] => {
    const listTaskFormatted: ITaskFormatted[] = [];
    for (let i = 1; i < diffTotal; i++) {
      const processDate = nextDate(i - 1);
      const selectedTask = listTasks.find((item) =>
        isEqual(parseISO(item.startDate), processDate),
      );
      if (selectedTask) {
        const qtyDays =
          differenceInDays(
            parseISO(selectedTask.finishDate),
            parseISO(selectedTask.startDate),
          ) === 0
            ? 1
            : differenceInDays(
                parseISO(selectedTask.finishDate),
                parseISO(selectedTask.startDate),
              );
        const widthBar = isAfter(
          parseISO(selectedTask.finishDate),
          lastDrawingDate,
        )
          ? differenceInDays(lastDrawingDate, parseISO(selectedTask.startDate))
          : qtyDays;

        let type: 'completed' | 'inprogress' | 'planned';
        if (isAfter(parseISO(selectedTask.startDate), dateBase)) {
          type = 'planned';
        } else if (!isAfter(parseISO(selectedTask.finishDate), dateBase)) {
          type = 'completed';
        } else {
          type = 'inprogress';
        }

        listTaskFormatted.push({
          id: i.toString(),
          startDate: selectedTask.startDate,
          finishDate: selectedTask.finishDate,
          description: selectedTask.description,
          qtyDays,
          widthBar,
          type,
        });
      } else {
        listTaskFormatted.push({
          id: i.toString(),
          startDate: '',
          finishDate: '',
          description: '',
          qtyDays: 0,
          widthBar: 0,
          type: 'planned',
        });
      }
    }

    return listTaskFormatted;
  };

  const listTasks1 = formatTask(tasks1);
  const listTasks2 = formatTask(tasks2);

  const posTop = position === 'bottom' ? 0 : 90;

  const marginTop =
    typeDraw === 'inline'
      ? posTop
      : listTasks1.filter((item) => item.startDate !== '').length * 90;

  const widthContainer = totPeriods * 119 + 50;

  return (
    <Container>
      <SubtitleStyled style={{ maxWidth: widthContainer }}>
        {currentLabels.map((item, key) => (
          <Fragment key={key}>
            <Square color={key.toString()} /> <div>{item}</div>
          </Fragment>
        ))}
      </SubtitleStyled>

      <Content style={{ marginTop, maxWidth: widthContainer }}>
        <RowStyled width={widthContainer}>
          {listTasks1.map((item, key) => {
            if (item.startDate !== '') {
              const pos = line * 90 + 60;
              if (typeDraw === 'rising') {
                line++;
              }
              return (
                <Task
                  key={key}
                  dateBase={dateBase}
                  startDate={item.startDate}
                  finishDate={item.finishDate}
                  description={item.description}
                  widthBar={item.widthBar}
                  qtyDays={item.qtyDays}
                  type={item.type}
                  position={pos}
                  widthDay={widthDay}
                  taskPosition="top"
                />
              );
            }
            return <DayTaskEmpty key={key} width={widthDay} />;
          })}
        </RowStyled>
        <RowStyled width={widthContainer}>
          <div style={{ position: 'relative' }}>
            <FirstMonthLabel>
              {format(datesBase[0], 'MMMM', { locale: currentLocale })}
            </FirstMonthLabel>
          </div>
          {rangeDates.map((item, key) => {
            if (item.getDate() === 1) {
              return (
                <div
                  key={key}
                  style={{ position: 'relative', width: widthDay }}
                >
                  <MarginMonth />
                  <MonthLabel>
                    {format(item, 'MMMM', { locale: currentLocale })}
                  </MonthLabel>
                </div>
              );
            }
            return <DayLabel key={key} width={widthDay} />;
          })}
        </RowStyled>

        <TimelineStyled>
          {datesBase.map((item, key) => (
            <div
              key={item.getDate()}
              style={{ display: 'flex', flexDirection: 'row', zIndex: 999 }}
            >
              <ItemDiv> {key !== 0 && '|'} </ItemDiv>
              <Item> {item.getDate()}</Item>
              {/* {key === datesBase.length - 1 && <ItemDiv> </ItemDiv>} */}
            </div>
          ))}
          <DayEvolution width={totEvol} />
        </TimelineStyled>
        <DayEvolutionLabel width={totEvol}>
          {format(dateBase, 'dd/MM')}
        </DayEvolutionLabel>

        <RowStyled width={widthContainer}>
          {listTasks2.map((item, key) => {
            if (item.startDate !== '') {
              const pos = line2 * 80 + 20;
              if (typeDraw === 'rising') {
                line2++;
              }
              return (
                <Task
                  key={key}
                  dateBase={dateBase}
                  startDate={item.startDate}
                  finishDate={item.finishDate}
                  description={item.description}
                  widthBar={item.widthBar}
                  qtyDays={item.qtyDays}
                  type={item.type}
                  position={pos}
                  widthDay={widthDay}
                  taskPosition="bottom"
                />
              );
            }
            return <DayTaskEmpty key={key} width={widthDay} />;
          })}
        </RowStyled>
      </Content>
      <GlobalStyle />
    </Container>
  );
};

export default Timeline;
