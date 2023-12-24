import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getNotifications } from '../../features/notifications';
import NotificationAllItem from './NotificationAllItem';
import NotificationAllItemSkeleton from './NotificationAllItemSkeleton';

const NotificationAll = () => {
    const { loading, notifications, page, numberOfPages } = useAppSelector(
        (state: RootState) => state.notifications,
    );
    const dispatch = useAppDispatch();

    const handleLoadMore = () => {
        dispatch(getNotifications({ page: page + 1 }));
    };

    return (
        <div className='flex flex-col gap-2.5'>
            {notifications.map((notification) => (
                <NotificationAllItem
                    key={notification._id}
                    data={notification}
                />
            ))}
            {page < numberOfPages && !loading && (
                <button
                    onClick={handleLoadMore}
                    className='w-fit font-semibold text-sm leading-sm text-blue-black-1'
                >
                    show more
                </button>
            )}
            {loading &&
                new Array(5)
                    .fill(null)
                    .map(() => <NotificationAllItemSkeleton key={v4()} />)}
            {notifications.length === 0 && !loading && (
                <div className='font-semibold text-xl text-center leading-xl text-black-8 dark:text-white'>
                    No notifications available
                </div>
            )}
        </div>
    );
};

export default NotificationAll;
