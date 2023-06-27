import getMonthYear from './getMonthYear';
import getTimeString from './getTimeString';

const classNames = (...classNameList: (string | boolean)[]): string => {
    return classNameList.filter((className) => !!className).join(' ');
};

const numberShow = (number: number) => (number < 10 ? '0' + number : number);

export { classNames, getMonthYear, getTimeString, numberShow };
