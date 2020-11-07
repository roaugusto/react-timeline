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
import { defaultTheme } from './styles/theme';
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

export interface IPositionTask {
  line: number;
  nextDate: Date;
}

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
  position: number;
}

export interface ITimeline {
  dateBase: Date;
  totPeriods: number;
  weeksPerPeriod: number;
  position: 'top' | 'bottom' | 'both';
  tasks: ITask[] | undefined;
  typeDraw: 'inline' | 'rising';
  locale?: Locale;
  labels?: string[];
  daysLabel?: string;
  backgroundColor?: string;
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
  daysLabel,
  backgroundColor,
}) => {
  const currentLocale = locale || enUS;
  const currentLabels = labels || [
    'Finished',
    'Under Development',
    'Not Started',
  ];

  const currentDaysLabel = daysLabel || 'days';
  const background = backgroundColor || defaultTheme.colors.background;

  const daysPerPeriods = weeksPerPeriod * 7;
  const widthDay = 17 / weeksPerPeriod;

  const firstMon = addDays(startOfWeek(dateBase), 1);
  const firstDate = subDays(startOfWeek(firstMon), 27 * weeksPerPeriod);

  const datesBase: Date[] = [];
  const rangeDates: Date[] = [];

  const tasks1: ITask[] = [];
  const tasks2: ITask[] = [];

  if (tasks !== undefined) {
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

  const formatTask = (
    listTasks: ITask[],
    positionTask: string,
  ): ITaskFormatted[] => {
    const listTaskFormatted: ITaskFormatted[] = [];
    const heigh = positionTask === 'top' ? 90 : 80;
    const spaceInitial = positionTask === 'top' ? 60 : 20;

    const positionsTasks: IPositionTask[] = [];

    let line = 0;
    let pos = 0;
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

        if (typeDraw === 'inline') {
          const lenDesc = Math.ceil(
            (selectedTask.description.length * 7) / widthDay,
          );
          const lenNext = lenDesc > widthBar ? lenDesc : widthBar;
          if (positionsTasks.length === 0) {
            line = 0;
            positionsTasks.push({
              line,
              nextDate: addDays(parseISO(selectedTask.startDate), lenNext),
            });
          } else {
            const totPositions = positionsTasks.length;
            let found = false;
            for (let j = 0; j < totPositions; j++) {
              const item = positionsTasks[j];
              if (isAfter(parseISO(selectedTask.startDate), item.nextDate)) {
                line = item.line;
                positionsTasks[j].nextDate = addDays(
                  parseISO(selectedTask.startDate),
                  lenNext,
                );
                j = positionsTasks.length + 1;
                found = true;
              }
            }
            if (!found) {
              line++;
              positionsTasks.push({
                line,
                nextDate: addDays(parseISO(selectedTask.startDate), lenNext),
              });
            }
          }
          pos = line * heigh + spaceInitial;
        } else {
          pos = line * heigh + spaceInitial;
          line++;
        }
        // const pos = line * heigh + spaceInitial;
        // line = typeDraw === 'rising' ? line + 1 : 0;

        listTaskFormatted.push({
          id: i.toString(),
          startDate: selectedTask.startDate,
          finishDate: selectedTask.finishDate,
          description: selectedTask.description,
          qtyDays,
          widthBar,
          type,
          position: pos,
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
          position: 0,
        });
      }
    }

    // console.log('listTaskFormatted', listTaskFormatted);
    // console.log('positionsTasks', positionsTasks);
    return listTaskFormatted;
  };

  const listTasks1 = formatTask(tasks1, 'top');
  const listTasks2 = formatTask(tasks2, 'bottom');

  // console.log('listTasks1', listTasks1);
  // console.log('listTasks2', listTasks2);

  const maxTopPosition = listTasks1.reduce<number>(
    (tot, item) => (item.position > tot ? item.position : tot),
    0,
  );

  const maxBottomPosition = listTasks2.reduce<number>(
    (tot, item) => (item.position > tot ? item.position : tot),
    0,
  );

  const spacesDraw = position === 'top' ? 250 : 300;
  const totalHeigh = maxTopPosition + maxBottomPosition + spacesDraw;

  const marginTop = maxTopPosition + 30;

  const widthContainer = totPeriods * 119 + 150;

  return (
    <Container style={{ height: totalHeigh, backgroundColor: background }}>
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
                  position={item.position}
                  widthDay={widthDay}
                  taskPosition="top"
                  daysLabel={currentDaysLabel}
                  backgroundColor={backgroundColor}
                />
              );
            }
            return <DayTaskEmpty key={key} width={widthDay} />;
          })}
        </RowStyled>
        <RowStyled width={widthContainer}>
          {datesBase[0].getDate() !== 1 && (
            <div style={{ position: 'relative' }}>
              <FirstMonthLabel>
                {format(datesBase[0], 'MMMM', { locale: currentLocale })}
              </FirstMonthLabel>
            </div>
          )}

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
                  position={item.position}
                  widthDay={widthDay}
                  taskPosition="bottom"
                  daysLabel={currentDaysLabel}
                  backgroundColor={backgroundColor}
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
