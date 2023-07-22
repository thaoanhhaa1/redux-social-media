export { default as getDateValue } from './getDateValue';
export { default as getKeyFeeling } from './getKeyFeeling';
export { default as getMonthYear } from './getMonthYear';
export { default as getNameStorage } from './getNameStorage';
export { default as getTime } from './getTime';
export { default as getTimeString } from './getTimeString';
export { default as isAdult } from './isAdult';
export { default as numberShow } from './numberShow';

export const classNames = (
    ...classNameList: (string | boolean | undefined)[]
): string => {
    return classNameList.filter((className) => !!className).join(' ');
};
