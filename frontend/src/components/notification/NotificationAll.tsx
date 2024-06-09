import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getNotifications } from '../../features/notifications';
import Empty from '../Empty';
import RenderList from '../RenderList';
import NotificationAllItem from './NotificationAllItem';
import NotificationAllItemSkeleton from './NotificationAllItemSkeleton';

const NotificationAll = () => {
    const { loading, notifications, page, numberOfPages } = useAppSelector(
        (state: RootState) => state.notifications,
    );
    const dispatch = useAppDispatch();

    const handleLoadMore = () =>
        dispatch(getNotifications({ skip: notifications.length }));

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
            {loading && (
                <RenderList
                    className='gap-2.5'
                    quantity={5}
                    Control={NotificationAllItemSkeleton}
                />
            )}

            {notifications.length === 0 && !loading && (
                <Empty>No notifications available</Empty>
            )}
        </div>
    );
};

export default NotificationAll;
