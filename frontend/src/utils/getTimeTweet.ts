function getTimeTweet(date?: Date | string): string {
    let dateNew = date;

    if (typeof dateNew !== 'object') {
        const temp = new Date(dateNew ?? '');

        if (!!temp.getTime()) dateNew = temp;
        else dateNew = new Date();
    }

    const timeNow = new Date().getTime();
    const time = dateNew.getTime();
    let minus = (timeNow - time) / 1000;

    // Just now
    if (minus < 60) return 'Just now';

    // Minutes
    minus /= 60;
    if (minus < 60) return `${Math.floor(minus)} minutes ago`;

    // Hours
    minus /= 60;
    if (minus < 24) return `${Math.floor(minus)} hours ago`;

    // Days
    minus /= 24;
    if (minus <= 1) return `a day ago`;
    if (minus <= 30) return `${Math.floor(minus)} days ago`;

    // Months
    minus /= 30;
    const stringDate = dateNew.toString();

    if (dateNew.getFullYear() === new Date().getFullYear()) {
        const [, month, day, , hour] = stringDate.split(' ');

        if (minus < 1) return `${month} ${day} at ${hour.substring(0, 5)}`;
        return `${month} ${day}`;
    }

    return stringDate.substring(4, 15);
}

export default getTimeTweet;
