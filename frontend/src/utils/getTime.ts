import numberShow from './numberShow';

function getTime(hours: number, minutes: number, isAM: boolean): string;
function getTime(date: Date): string;

function getTime(arg: any, minutes?: number, isAM?: boolean) {
    let hours = arg;
    if (typeof arg !== 'number') {
        hours = arg.getHours();
        minutes = arg.getMinutes();
        isAM = hours <= 12;
    }

    return `${numberShow(hours - (isAM ? 0 : 12))}:${numberShow(
        minutes || 0,
    )} ${isAM ? 'AM' : 'PM'}`;
}

export default getTime;
