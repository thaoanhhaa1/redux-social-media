import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
} from 'react';

const CommentTweetContext = createContext({
    level: 0,
    showPopup: false,
    setScrolled: (b: boolean) => {},
    setShowCardComment: (b: boolean) => {},
    setShowParent: (b: boolean) => {},
    setShowPopup: (b: boolean) => {},
    setEdit: (b: string) => {},
});

const CommentTweetProvider = ({
    value,
    ...props
}: {
    value: {
        level: number;
        showPopup: boolean;
        setScrolled: Dispatch<SetStateAction<boolean>>;
        setShowCardComment: Dispatch<SetStateAction<boolean>>;
        setShowParent: Dispatch<SetStateAction<boolean>>;
        setShowPopup: Dispatch<SetStateAction<boolean>>;
        setEdit: Dispatch<SetStateAction<string>>;
    };
} & PropsWithChildren) => (
    <CommentTweetContext.Provider {...props} value={value} />
);

const useCommentTweet = () => useContext(CommentTweetContext);

export default useCommentTweet;
export { CommentTweetProvider };
