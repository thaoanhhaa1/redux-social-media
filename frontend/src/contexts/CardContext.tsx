import { ReactElement, createContext, useContext } from 'react';
import * as tweets from '../features/tweets';
import { ICardContext, IComment } from '../interfaces';

const CardContext = createContext<ICardContext>({
    tweet: {
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
    },
    action: tweets,
    blockedType: 'NONE',
    reportLoading: false,
    setBlockedType: () => {},
    toggleUserList: () => {},
    toggleUserFollow: () => {},
    deleteComment: (commentId: string, parentCommentId?: string) => {},
    toggleLikeComment: (liked: boolean, commentId: string) => {},
    toggleLikeTweet: () => {},
    toggleNotInterested: () => {},
    toggleReport: () => {},
    loadMoreComment: () => {},
    postComment: ({ content, parent }: { content: string; parent?: string }) =>
        Promise.resolve({} as IComment),
    getAllChildComments: (commentId: string) => Promise.resolve([]),
    updateComment: ({
        commentId,
        content,
    }: {
        content: string;
        commentId: string;
    }) => Promise.resolve(),
});

const CardProvider = ({
    value,
    ...props
}: {
    value: ICardContext;
    children: ReactElement;
}) => {
    return <CardContext.Provider value={value} {...props} />;
};

const useCardContext = () => {
    const value = useContext(CardContext);

    return value;
};

export default CardProvider;
export { useCardContext };
