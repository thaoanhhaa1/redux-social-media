import { images } from '../assets';
import { IFeeling } from '../interfaces';

const feelings: {
    [key: string]: Array<IFeeling>;
} = {
    feelings: [
        {
            image: images.happy,
            title: 'happy',
        },
        {
            image: images.blessed,
            title: 'blessed',
        },
        {
            image: images.loved,
            title: 'loved',
        },
        {
            image: images.sad,
            title: 'sad',
        },
    ],
    activities: [
        {
            title: 'Celebrating',
            image: images.celebrating,
        },
        {
            title: 'Watching',
            image: images.watching,
        },
        {
            title: 'Eating',
            image: images.eating,
        },
        {
            title: 'Drinking',
            image: images.drinking,
        },
    ],
    celebrating: [
        {
            title: 'friendship',
            image: images.friendship,
        },
        {
            title: 'a birthday',
            image: images.aBirthday,
        },
        {
            title: 'your special day',
            image: images.yourSpecialDay,
        },
        {
            title: 'birthdays',
            image: images.birthdays,
        },
    ],
    watching: [],
    eating: [],
    drinking: [],
};

export default feelings;
