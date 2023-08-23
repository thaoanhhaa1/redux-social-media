import { PropsWithChildren, createContext, useContext } from 'react';

const CreateTweetContext = createContext({
    handleHeightModal: () => {},
    handleHiddenSub: () => {},
});

function CreateTweetProvider({
    handleHeightModal,
    handleHiddenSub,
    ...props
}: {
    handleHeightModal: () => void;
    handleHiddenSub: () => void;
} & PropsWithChildren) {
    return (
        <CreateTweetContext.Provider
            value={{ handleHeightModal, handleHiddenSub }}
            {...props}
        />
    );
}

function useCreateTweet() {
    return useContext(CreateTweetContext);
}

export default useCreateTweet;
export { CreateTweetProvider };
