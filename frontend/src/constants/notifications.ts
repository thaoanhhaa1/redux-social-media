import { INotification } from '../interfaces';

// "ADD_STORY" | "BIRTHDAY" | "POST_TWEET" | "LIKE_TWEET" | "POST_COMMENT" | "LIKE_COMMENT"

const notifications = {
    getTitle: ({ type, user }: INotification) => {
        if (type === 'POST_TWEET')
            return `${user.name || user.username} posted a tweet.`;

        if (type === 'LIKE_TWEET')
            return `${user.name || user.username} liked to your tweet.`;

        if (type === 'POST_COMMENT')
            return `${user.name || user.username} commented on your tweet.`;

        if (type === 'ADD_STORY')
            return `${user.name || user.username} posted a story.`;

        if (type === 'BIRTHDAY') {
            return `${user.name || user.username}'s birthday was yesterday.`;
        }

        if (type === 'LIKE_COMMENT')
            return `${user.name || user.username} likes your comment`;

        return type;
    },
};

export default notifications;
