import { ReactElement, createContext, useContext } from 'react';
import { ICardContext, IComment } from '../interfaces';

const CardContext = createContext<ICardContext>({
    tweet: {
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
    },
    toggleUserList: () => {},
    toggleUserFollow: () => {},
    deleteComment: (commentId: string, parentCommentId?: string) => {},
    toggleLikeComment: (liked: boolean, commentId: string) => {},
    editComment: (content: string, commentId: string) => {},
    toggleLikeTweet: () => {},
    toggleNotInterested: () => {},
    addComments: (comments: IComment[]) => {},
    postComment: (Comment: IComment) => {},
    addChildrenComments: (comments: IComment[]) => {},
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
