import { ReactElement, createContext, useContext } from 'react';
import { ICardContext } from '../interfaces';

const CardContext = createContext<ICardContext>({
    user: {
        _id: '',
        avatar: '',
        name: '',
        username: '',
    },
    tweet: {},
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
