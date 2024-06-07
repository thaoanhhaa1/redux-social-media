export { default as findTweetById } from './findTweetById';
export { default as getArray } from './getArray';
export { default as getBookmarkDTO } from './getBookmarkDTO';
export { default as getBookmarksDTO } from './getBookmarksDTO';
export { default as getComment } from './getComment';
export { default as getCommentDTO } from './getCommentDTO';
export { default as getCommentsDTO } from './getCommentsDTO';
export { default as getDateValue } from './getDateValue';
export { default as getKeyFeeling } from './getKeyFeeling';
export { default as getMonthYear } from './getMonthYear';
export { default as getNameStorage } from './getNameStorage';
export { default as getNewTweets } from './getNewTweets';
export { default as getNextLevelComment } from './getNextLevelComment';
export { default as getParentComment } from './getParentComment';
export { default as getTime } from './getTime';
export { default as getTimeComment } from './getTimeComment';
export { default as getTimeString } from './getTimeString';
export { default as getTimeTweet } from './getTimeTweet';
export { default as getTrendingDTO } from './getTrendingDTO';
export { default as getTweetDTO } from './getTweetDTO';
export { default as getTweetsDTO } from './getTweetsDTO';
export { default as getUserName } from './getUserName';
export { default as isAdult } from './isAdult';
export { default as isBlock } from './isBlock';
export { default as numberShow } from './numberShow';
export { default as token } from './token';

export const classNames = (
    ...classNameList: (string | boolean | undefined)[]
): string => {
    return classNameList
        .filter((className) => className && typeof className === 'string')
        .join(' ');
};
