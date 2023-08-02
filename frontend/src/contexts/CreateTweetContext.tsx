import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
} from 'react';
import SubProps from '../types/SubProps';

const CreateTweetContext = createContext({
    setSub: (sub?: SubProps) => {},
    handleHeightModal: () => {},
    handleHiddenSub: () => {},
});

function CreateTweetProvider({
    setSub,
    handleHeightModal,
    handleHiddenSub,
    ...props
}: {
    setSub: Dispatch<SetStateAction<SubProps>>;
    handleHeightModal: () => void;
    handleHiddenSub: () => void;
} & PropsWithChildren) {
    return (
        <CreateTweetContext.Provider
            value={{ setSub, handleHeightModal, handleHiddenSub }}
            {...props}
        />
    );
}

function useCreateTweet() {
    return useContext(CreateTweetContext);
}

export default useCreateTweet;
export { CreateTweetProvider };
