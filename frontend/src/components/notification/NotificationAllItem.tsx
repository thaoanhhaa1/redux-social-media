import { useAppDispatch } from '../../app/hooks';
import { notifications } from '../../constants';
import {
    deleteNotification,
    removeNotification,
} from '../../features/notifications';
import { INotification } from '../../interfaces';
import Avatar from '../Avatar';
import { CloseIcon } from '../Icons';

const NotificationAllItem = ({ data }: { data: INotification }) => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(deleteNotification(data._id));
        dispatch(removeNotification(data._id));
    };

    return (
        <div className='group/close flex gap-5 p-5 rounded-2.5 hover:bg-blue-white-4 dark:bg-dark-black-1 dark:hover:bg-dark-black-3 shadow-container dark:shadow-none ease-linear duration-300'>
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
        </div>
    );
};

export default NotificationAllItem;
