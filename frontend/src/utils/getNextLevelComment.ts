function getNextLevelComment(level: number = 0): number {
    return Math.min(3, level + 1);
}

export default getNextLevelComment;
