import { ReactElement, createContext, useContext } from 'react';
import { ICardContext, ITweet } from '../interfaces';

const CardContext = createContext<ICardContext>({
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
    isPopup: false,
    notInterested: false,
    updateTweet: (tweet: ITweet) => {},
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
