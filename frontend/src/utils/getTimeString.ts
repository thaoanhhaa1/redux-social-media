function getTime(hours: number, minutes: number, isAM: boolean) {
    return `${hours - (isAM ? 0 : 12)}:${minutes} ${isAM ? 'AM' : 'PM'}`;
}

function getDate(date: string) {
    return date.split('/').map((item) => (item.length < 2 ? '0' + item : item));
}

function getTimeString(date: Date): string {
    const dateNow = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isAM: boolean = hours <= 12;

    if (date.getFullYear() < dateNow.getFullYear())
        return `${hours}:${minutes}, ${getDate(date.toLocaleDateString())}`;

    const time = getTime(hours, minutes, isAM);
    if (date.getMilliseconds() < dateNow.getMilliseconds() - 604800000)
        return (
            date
                .toDateString()
                .substring(4)
                .replaceAll(' ', ', ')
                .replace(', ', ' ') +
            ', ' +
            time
        );

    if (date.getDate() < dateNow.getDate())
        return date.toString().substring(0, 3) + ' ' + time;

    return date.toLocaleTimeString().substring(0, 5);
}

export default getTimeString;
