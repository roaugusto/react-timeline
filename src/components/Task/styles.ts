import styled, { css } from 'styled-components';
import { defaultTheme } from '../../styles/theme';

interface DayTaskProps {
  position: number;
  taskPosition: 'top' | 'bottom';
}

interface DayBarProps {
  width: number;
  type: 'completed' | 'inprogress' | 'planned';
  text: boolean;
}
interface MarginProps {
  position: number;
  type: 'completed' | 'inprogress' | 'planned';
  taskPosition: 'top' | 'bottom';
}

interface WidthProps {
  width: number;
  daysFromStart: number;
}

interface DescriptionProps {
  backgroundColor?: string;
}

const marginColorsVariations = {
  completed: css`
    border-color: ${defaultTheme.colors.completed};
  `,
  inprogress: css`
    border-color: ${defaultTheme.colors.inprogress};
  `,
  planned: css`
    border-color: ${defaultTheme.colors.planned};
  `,
};

const dayBarColorsVariations = {
  completed: css`
    background: ${defaultTheme.colors.completed};
  `,
  inprogress: css`
    background: ${defaultTheme.colors.inprogress};
  `,
  planned: css`
    background: ${defaultTheme.colors.planned};
  `,
};

export const MarginDay = styled.div<MarginProps>`
  position: absolute;
  border-left: 1px solid;
  height: ${(props) => `${props.position + 10}px`};
  margin-left: 3px;

  ${(props) => marginColorsVariations[props.type || 'planned']}

  ${(props) =>
    props.taskPosition === 'top' &&
    css`
      margin-top: -${props.position - 45}px;
      height: ${props.position + 15}px;
    `}

  ${(props) =>
    props.taskPosition === 'bottom' &&
    css`
      margin-top: -40px;
      height: ${props.position + 80}px;
    `}
`;

export const DayTask = styled.div<DayTaskProps>`
  position: absolute;
  margin-left: 6px;
  color: ${defaultTheme.colors.timeline};
  width: max-content;
  font-size: 14px;

  ${(props) =>
    props.taskPosition === 'top' &&
    css`
      margin-top: -${props.position}px;
    `}

  ${(props) =>
    props.taskPosition === 'bottom' &&
    css`
      margin-top: ${props.position}px;
    `}
`;

export const DayBar = styled.div<DayBarProps>`
  margin-left: -3px;
  margin-top: 5px;
  font-size: 14px;

  ${(props) => dayBarColorsVariations[props.type || 'planned']}
  display: block;
  width: ${(props) => `${props.width}px`};
  position: relative;
  padding: 3px 2px;
  line-height: 24px;
  z-index: 999;
  color: ${defaultTheme.colors.letters};

  white-space: pre-wrap;
  display: flex;
  justify-content: center;

  ${(props) =>
    props.text &&
    css`
      min-width: 60px;
    `}
`;

export const DescDay = styled.div<DescriptionProps>`
  background: ${defaultTheme.colors.background};
  color: ${defaultTheme.colors.timeline};
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 5px;

  position: relative;
  z-index: 999;
  width: max-content;

  ${(props) =>
    props.backgroundColor &&
    css`
      background: ${props.backgroundColor};
    `}
`;

export const DescTask = styled.div<DescriptionProps>`
  background: ${defaultTheme.colors.background};
  position: relative;
  z-index: 999;
  padding: 3px 0;
  display: flex;
  align-items: center;
  width: max-content;

  svg {
    margin-right: 5px;
  }

  ${(props) =>
    props.backgroundColor &&
    css`
      background: ${props.backgroundColor};
    `}
`;

export const TaskContent = styled.div<WidthProps>`
  /* position: relative; */
  position: absolute;
  margin-left: ${(props) => `${props.daysFromStart * props.width}px`};
  width: ${(props) => `${props.width}px`};
  /* margin-left: -2px; */
`;
