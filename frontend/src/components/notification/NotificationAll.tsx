import NotificationAllItem from './NotificationAllItem';

const NotificationAll = () => {
    return (
        <div className="flex flex-col gap-2.5">
            <NotificationAllItem />
            <NotificationAllItem />
            <NotificationAllItem />
            <NotificationAllItem />
            <NotificationAllItem />
            <NotificationAllItem />
            <button className="w-fit font-semibold text-sm leading-sm text-blue-black-1">
                show more
            </button>
        </div>
    );
};

export default NotificationAll;
