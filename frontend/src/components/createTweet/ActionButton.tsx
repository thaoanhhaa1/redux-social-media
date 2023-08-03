import { useLocalStorage } from 'usehooks-ts';
import { useAppDispatch } from '../../app/hooks';
import config from '../../config';
import useCreateTweet from '../../contexts/CreateTweetContext';
import { setShowUploadImage } from '../../features/myTweet';
import { useActionCreateTweetBtn } from '../../hooks';
import { IActionCreateTweet } from '../../interfaces';
import Button from '../Button';
import Image from '../Image';
import Tooltip from '../Tooltip';
import { classNames } from '../../utils';

const ActionButton = ({ action }: { action: IActionCreateTweet }) => {
    const { disabled, active } = useActionCreateTweetBtn(action);
    const [isDarkTheme] = useLocalStorage(config.THEME_KEY, true);
    const { setSub } = useCreateTweet();
    const dispatch = useAppDispatch();
    let styles = {};

    const handleClick = () => {
        if (action.tooltip === 'Photo/Video')
            dispatch(setShowUploadImage(true));
        else setSub(action.sub);
    };

    if (active)
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
                className={classNames(
                    'w-9 h-9 transition-all',
                    (disabled &&
                        'grayscale brightness-30 dark:brightness-50') ||
                        'group-hover:bg-white-1 dark:group-hover:bg-white-opacity-10',
                )}
            >
                <Image className='w-6 h-6' alt='' src={action.image} />
            </Button>
        </Tooltip>
    );
};

export default ActionButton;
