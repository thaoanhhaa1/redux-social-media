export { default as getCommentDTO } from './getCommentDTO';
export { default as getCommentsDTO } from './getCommentsDTO';
export { default as getDateValue } from './getDateValue';
export { default as getKeyFeeling } from './getKeyFeeling';
export { default as getMonthYear } from './getMonthYear';
export { default as getNameStorage } from './getNameStorage';
export { default as getNextLevelComment } from './getNextLevelComment';
export { default as getParentComment } from './getParentComment';
export { default as getTime } from './getTime';
export { default as getTimeComment } from './getTimeComment';
export { default as getTimeString } from './getTimeString';
export { default as getTimeTweet } from './getTimeTweet';
export { default as getUserName } from './getUserName';
export { default as isAdult } from './isAdult';
export { default as numberShow } from './numberShow';

export const classNames = (
    ...classNameList: (string | boolean | undefined)[]
): string => {
    return classNameList
        .filter((className) => className && typeof className === 'string')
        .join(' ');
};
