import { v4 } from 'uuid';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import NotificationAllItem from './NotificationAllItem';
import NotificationAllItemSkeleton from './NotificationAllItemSkeleton';

// TODO Load more notifications
const NotificationAll = () => {
    const { loading, notifications, page, numberOfPages } = useAppSelector(
        (state: RootState) => state.notifications,
    );

    return (
        <div className='flex flex-col gap-2.5'>
            {(loading && (
                <>
                    {new Array(5).fill(null).map(() => (
                        <NotificationAllItemSkeleton key={v4()} />
                    ))}
                </>
            )) || (
                <>
                    {notifications.map((notification) => (
                        <NotificationAllItem
                            key={notification._id}
                            data={notification}
                        />
                    ))}
                </>
            )}
            {page < numberOfPages && (
                <button className='w-fit font-semibold text-sm leading-sm text-blue-black-1'>
                    show more
                </button>
            )}
            {notifications.length === 0 && (
                <div className='font-semibold text-xl text-center leading-xl text-black-8 dark:text-white'>
                    No notifications available
                </div>
            )}
        </div>
    );
};

export default NotificationAll;
