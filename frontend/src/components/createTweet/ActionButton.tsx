import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IActionCreateTweet } from '../../interfaces';
import Button from '../Button';
import Image from '../Image';
import Tooltip from '../Tooltip';

const ActionButton = ({
    action,
    onClick,
}: {
    action: IActionCreateTweet;
    onClick: () => void;
}) => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    let styles = {};

    if (myTweet[(action.title ?? '') as keyof typeof myTweet])
        styles = { backgroundColor: action.backgroundColor };

    return (
        <Tooltip tooltip={action.tooltip}>
            <Button
                onClick={onClick}
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
