import getDateValue from './getDateValue';
import getKeyFeeling from './getKeyFeeling';
import getMonthYear from './getMonthYear';
import getNameStorage from './getNameStorage';
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
    getKeyFeeling,
    getMonthYear,
    getNameStorage,
    getTime,
    getTimeString,
    isAdult,
    numberShow,
};
