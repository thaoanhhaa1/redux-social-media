import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { IActionCreateTweet } from '../interfaces';

function useActionCreateTweetBtn(action: IActionCreateTweet) {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const disabled = useMemo(() => {
        if (!action.disabled) return false;

        return action.disabled.some(
            (item) => myTweet[item as keyof typeof myTweet],
        );
    }, [action.disabled, myTweet]);

    const active = useMemo(
        () => myTweet[(action.title ?? '') as keyof typeof myTweet],
        [action.title, myTweet],
    );

    return { disabled, active };
}

export default useActionCreateTweetBtn;
