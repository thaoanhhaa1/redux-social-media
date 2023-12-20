function getTimeComment(date: string): string {
    const dateNew = new Date(date);

    const timeNow = new Date().getTime();
    const time = dateNew.getTime();
    let minus = Math.ceil((timeNow - time) / 1000);

    if (minus < 60) return `${minus}s`;

    if (minus < 3600) {
        const minutes = Math.ceil(minus / 60);
        return `${minutes}m`;
    }

    if (minus < 86400) {
        const hours = Math.ceil(minus / 3600);
        return `${hours}h`;
    }

    if (minus < 604800) {
        const days = Math.ceil(minus / 86400);
        return `${days}d`;
    }

    if (minus < 2419200) {
        const weeks = Math.ceil(minus / 604800);
        return `${weeks}w`;
    }

    if (minus < 29030400) {
        const months = Math.ceil(minus / 2419200);
        return `${months}mo`;
    }

    const years = Math.ceil(minus / 29030400);
    return `${years}y`;
}

export default getTimeComment;
