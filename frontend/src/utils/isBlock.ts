import { IPerson } from '../interfaces';

const isBlock = (
    blocked: IPerson[],
    beenBlocked: IPerson[],
    userId: string,
) => {
    return [...blocked, ...beenBlocked].some((person) => person._id === userId);
};

export default isBlock;
