import styled, { css } from 'styled-components';
import { defaultTheme } from './styles/theme';

interface DayEvolutionProps {
  width: string;
}

interface WidthProps {
  width: number;
}

interface SquareProps {
  color: string;
}

export const Container = styled.div`
  display: block;
  margin: auto auto;
`;

export const Content = styled.div`
  display: block;
  margin: auto auto;
`;

export const Square = styled.span<SquareProps>`
  height: 10px;
  width: 10px;
  background-color: #555;
  margin-right: 5px;
  background-color: ${(props) => props.color};

  ${(props) =>
    props.color === '0' &&
    css`
      background-color: ${defaultTheme.colors.completed};
    `}
  ${(props) =>
    props.color === '1' &&
    css`
      background-color: ${defaultTheme.colors.inprogress};
    `}
  ${(props) =>
    props.color === '2' &&
    css`
      background-color: ${defaultTheme.colors.planned};
    `}
`;

export const SubtitleStyled = styled.div`
  display: flex;
  flex-direction: row;
  color: #737373;
  margin: auto auto;
  margin-top: 10px;
  align-items: center;

  div {
    margin-right: 20px;
    font-size: 14px;
  }
`;

export const RowStyled = styled.div<WidthProps>`
  display: flex;
  flex-direction: row;
  width: ${(props) => `${props.width}px`};
`;

export const TimelineStyled = styled.div`
  display: flex;
  flex-direction: row;

  padding: 50px 30px;

  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ItemDiv = styled.span`
  color: #fff;
  background: #737373;
  display: block;
  position: relative;
  padding: 8px 0;
  line-height: 24px;

  font-size: 24px;
  width: 7px;
`;
export const Item = styled.span`
  pointer-events: none;
  color: #fff;
  background: #737373;
  display: block;
  position: relative;
  padding: 10px 10px;
  line-height: 24px;

  font-size: 14px;

  width: 112px;
`;

export const DayEvolution = styled.div<DayEvolutionProps>`
  position: absolute;
  background: #1ea2cf;
  display: block;
  padding: 5px 10px;
  line-height: 24px;
  z-index: 9999;

  margin-top: 35px;
  width: ${(props) => props.width};

  &::before {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: #1ea2cf transparent;
    border-width: 0px 6px 12px 6px;
    bottom: 20px;
    top: 100%;
    left: 100%;
    transform: translateX(-50%);
  }
`;

export const DayEvolutionLabel = styled.div<DayEvolutionProps>`
  display: flex;
  justify-content: flex-end;
  color: #737373;
  font-size: 16px;
  margin-left: 20px;
  margin-top: 15px;
  width: ${(props) => props.width};
  font-weight: bold;
`;

export const FirstMonthLabel = styled.div`
  position: absolute;
  margin-bottom: 10px;
  margin-left: -45px;
  text-transform: capitalize;
  color: #737373;
  font-size: 16px;
  font-weight: bold;

  bottom: 5px;
`;

export const MonthLabel = styled.div`
  position: absolute;
  margin-bottom: 10px;
  margin-left: 10px;
  text-transform: capitalize;
  color: #737373;
  font-size: 16px;
  font-weight: bold;

  bottom: 5px;
`;

export const DayLabel = styled.div<WidthProps>`
  margin-bottom: 10px;
  color: #737373;
  width: ${(props) => `${props.width}px`};
`;
export const MarginMonth = styled.div`
  border-left: 1px solid #a1c5e5;
  height: 40px;
  margin-top: 20px;
  margin-left: 3px;
`;

export const DayTaskEmpty = styled.div<WidthProps>`
  width: ${(props) => `${props.width}px`};
`;
