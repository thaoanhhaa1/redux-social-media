import {
    Dispatch,
    MemoExoticComponent,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
} from 'react';
import { ISubTweet } from '../interfaces';
import SubProps from '../types/SubProps';

const CreateTweetContext = createContext({
    setSub: (
        sub:
            | MemoExoticComponent<
                  ({ handleHiddenSub }: ISubTweet) => JSX.Element
              >
            | undefined,
    ) => {},
    handleHeightModal: () => {},
});

function CreateTweetProvider({
    setSub,
    handleHeightModal,
    ...props
}: {
    setSub: Dispatch<SetStateAction<SubProps | undefined>>;
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
