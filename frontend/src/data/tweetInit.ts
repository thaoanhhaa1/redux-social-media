import { ITweet } from '../interfaces';

const tweetInit: ITweet = {
    comments: [],
    skip: 0,
    numberOfComments: 0,
    _id: '',
    user: {
        _id: '',
        avatar: '',
        follow: false,
        isInList: false,
        name: '',
        username: '',
    },
    createdAt: '',
    notInterested: false,
    likes: [],
    blocked: false,
    report: false,
};

export default tweetInit;
