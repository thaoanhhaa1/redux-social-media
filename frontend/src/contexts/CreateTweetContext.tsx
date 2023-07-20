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
                  ({
                      handleHiddenSub,
                      handleHeightModal,
                  }: ISubTweet) => JSX.Element
              >
            | undefined,
    ) => {},
});

function CreateTweetProvider({
    setSub,
    ...props
}: {
    setSub: Dispatch<SetStateAction<SubProps | undefined>>;
} & PropsWithChildren) {
    return <CreateTweetContext.Provider value={{ setSub }} {...props} />;
}

function useCreateTweet() {
    return useContext(CreateTweetContext);
}

export default useCreateTweet;
export { CreateTweetProvider };
