import getDateValue from './getDateValue';
import getMonthYear from './getMonthYear';
import getTime from './getTime';
import getTimeString from './getTimeString';
import isAdult from './isAdult';
import numberShow from './numberShow';

const classNames = (...classNameList: (string | boolean)[]): string => {
    return classNameList.filter((className) => !!className).join(' ');
};

export {
    classNames,
    getDateValue,
    getMonthYear,
    getTime,
    getTimeString,
    isAdult,
    numberShow,
};
