import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ToastProps } from 'react-toastify/dist/types';
import { useAppDispatch } from '../../app/hooks';
import { notifications } from '../../constants';
import {
    deleteNotification,
    removeNotification,
} from '../../features/notifications';
import { INotification } from '../../interfaces';
import { classNames } from '../../utils';
import Avatar from '../Avatar';
import { CloseIcon } from '../Icons';

const NotificationAllItem = ({
    data,
    closeToast = () => {},
    toastProps,
}: {
    data: INotification;
    closeToast?: () => void;
    toastProps?: ToastProps;
}) => {
    const dispatch = useAppDispatch();

    if (!data) return null;

    const handleClick = (e: MouseEvent) => {
        if (!data.tweetId || !data.tweetUsername) e.preventDefault();
    };

    const handleClose = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (toastProps) return closeToast();

        dispatch(deleteNotification(data._id));
        dispatch(removeNotification(data._id));
    };

    return (
        <Link
            onClick={handleClick}
            to={`/${data.tweetUsername!}/tweets/${data.tweetId!}`}
            className={classNames(
                'group/close flex p-2 xxs:p-3 xs:p-4 dl:p-5 gap-2 xxs:gap-3 xs:gap-4 dl:gap-5 rounded-2.5 hover:bg-blue-white-4 dark:bg-dark-black-1 dark:hover:bg-dark-black-3 ease-linear duration-300',
                toastProps ? '' : 'shadow-container dark:shadow-none',
            )}
        >
            <Avatar src={data.user.avatar} size='lg' />
            <div className='flex-1 flex justify-between items-center'>
                <div>
                    <div className='font-semibold text-base-black dark:text-white'>
                        {notifications.getTitle(data)}
                    </div>
                    <p className='mt-1 text-sm leading-sm text-stroke-icon dark:text-white'>
                        {data.description}
                    </p>
                </div>
                <button
                    onClick={handleClose}
                    className='w-6 h-6 flex justify-center items-center'
                >
                    <CloseIcon className='transition-all duration-300 text-stroke-icon group-hover/close:text-red dark:text-white' />
                </button>
            </div>
        </Link>
    );
};

export default NotificationAllItem;
