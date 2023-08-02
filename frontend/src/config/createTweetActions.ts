import { images } from '../assets';
import {
    Feeling,
    Gif,
    Locations,
    More,
    TagPeople,
} from '../components/createTweet/subTweet';
import { IActionCreateTweet } from '../interfaces';
import routes from './routes';

const createTweetActions: IActionCreateTweet[] = [
    {
        title: '',
        tooltip: 'Photo/Video',
        image: images.image,
        backgroundColor: '#E4F0D5',
        disabled: 'gif',
    },
    {
        title: 'tagPeople',
        tooltip: 'Tag people',
        image: images.tagPeople,
        sub: TagPeople,
        backgroundColor: '#CAEEF9',
    },
    {
        title: 'feeling',
        tooltip: 'Feeling/activity',
        image: images.feeling,
        sub: Feeling,
        backgroundColor: '#FEF2D1',
    },
    {
        title: 'location',
        tooltip: 'Check in',
        image: images.checkIn,
        sub: Locations,
        backgroundColor: '#FBCCD2',
    },
    {
        title: 'gif',
        tooltip: 'GIF',
        image: images.gif,
        sub: Gif,
        backgroundColor: '#D2F0EA',
        disabled: 'image',
    },
    {
        tooltip: 'More',
        image: images.more,
        sub: More,
    },
    {
        tooltip: 'Live video',
        image: images.liveVideo,
        link: routes.liveVideo,
    },
    {
        tooltip: 'Life event',
        image: images.lifeEvent,
    },
];

export default createTweetActions;
