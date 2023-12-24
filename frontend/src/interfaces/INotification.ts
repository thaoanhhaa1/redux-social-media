import IPerson from './IPerson';

interface INotification {
    _id: number;
    user: IPerson;
    type:
        | 'ADD_STORY'
        | 'BIRTHDAY'
        | 'POST_TWEET'
        | 'LIKE_TWEET'
        | 'POST_COMMENT'
        | 'LIKE_COMMENT';
    description?: string;
    createdAt: string;
}

export default INotification;
