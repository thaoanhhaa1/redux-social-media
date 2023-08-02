import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocalStorage } from 'usehooks-ts';
import { RootState } from '../../app/store';
import config from '../../config';
import useCreateTweet from '../../contexts/CreateTweetContext';
import { IActionCreateTweet } from '../../interfaces';
import Button from '../Button';
import Image from '../Image';
import Tooltip from '../Tooltip';
import { useAppDispatch } from '../../app/hooks';
import { setShowUploadImage } from '../../features/myTweet';

const ActionButton = ({ action }: { action: IActionCreateTweet }) => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const disabled = useMemo(
        () =>
            !!action.disabled &&
            !!myTweet[action.disabled as keyof typeof myTweet],
        [action.disabled, myTweet],
    );
    const [isDarkTheme] = useLocalStorage(config.THEME_KEY, true);
    const { setSub } = useCreateTweet();
    const dispatch = useAppDispatch();
    let styles = {};

    const handleClick = () => {
        if (action.tooltip === 'Photo/Video')
            dispatch(setShowUploadImage(true));
        else setSub(action.sub);
    };

    if (myTweet[(action.title ?? '') as keyof typeof myTweet])
        styles = {
            backgroundColor: (isDarkTheme && 'black') || action.backgroundColor,
        };

    return (
        <Tooltip tooltip={action.tooltip ?? ''}>
            <Button
                disabled={disabled}
                onClick={handleClick}
                rounded
                style={styles}
                className='w-9 h-9 group-hover:bg-white-1 dark:group-hover:bg-white-opacity-10 transition-all'
            >
                <Image className='w-6 h-6' alt='' src={action.image} />
            </Button>
        </Tooltip>
    );
};

export default ActionButton;
