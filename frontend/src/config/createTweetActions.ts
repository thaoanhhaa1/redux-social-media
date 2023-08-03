import { images } from '../assets';
import {
    Feeling,
    Gif,
    LifeEvent,
    Locations,
    More,
    TagPeople,
} from '../components/createTweet/subTweet';
import { IActionCreateTweet } from '../interfaces';
import routes from './routes';

const createTweetActions: IActionCreateTweet[] = [
    {
        title: 'isShowUploadImage',
        tooltip: 'Photo/Video',
        image: images.image,
        backgroundColor: '#E4F0D5',
        disabled: ['gif'],
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
        disabled: ['isShowUploadImage'],
    },
    {
        tooltip: 'More',
        image: images.more,
        sub: More,
    },
    {
        title: 'liveVideo',
        tooltip: 'Live video',
        image: images.liveVideo,
        link: routes.liveVideo,
        disabled: ['isShowUploadImage', 'gif'],
    },
    {
        title: 'lifeEvent',
        tooltip: 'Life event',
        image: images.lifeEvent,
        disabled: ['isShowUploadImage', 'gif'],
        sub: LifeEvent,
    },
];

export default createTweetActions;
