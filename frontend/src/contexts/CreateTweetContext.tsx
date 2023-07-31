import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
} from 'react';
import SubProps from '../types/SubProps';

const CreateTweetContext = createContext({
    setSub: (sub: SubProps) => {},
    handleHeightModal: () => {},
});

function CreateTweetProvider({
    setSub,
    handleHeightModal,
    ...props
}: {
    setSub: Dispatch<SetStateAction<SubProps>>;
    handleHeightModal: () => void;
} & PropsWithChildren) {
    return (
        <CreateTweetContext.Provider
            value={{ setSub, handleHeightModal }}
            {...props}
        />
    );
}

function useCreateTweet() {
    return useContext(CreateTweetContext);
}

export default useCreateTweet;
export { CreateTweetProvider };
