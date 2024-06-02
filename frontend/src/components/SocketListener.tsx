import { ReactNode, useEffect } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { socketEvents } from '../constants';
import { setOffline, setOnline } from '../features/contacts';
import {
    addNotificationSocket,
    deleteNotificationSocket,
} from '../features/notifications';
import { dec, inc } from '../features/profile';
import { addCommentSocket, toggleLikeTweetSocket } from '../features/tweets';
import { INotification } from '../interfaces';
import NotificationAllItem from './notification/NotificationAllItem';

const toastNotification = (data: INotification) =>
    toast(
        (props: ToastContentProps<unknown>) => (
            <NotificationAllItem {...props} data={data} />
        ),
        {
            className: 'p-0 max-w-[500px]',
            bodyClassName: 'p-0',
            toastId: data._id,
            closeButton: false,
        },
    );

const SocketListener = ({ children }: { children: ReactNode }): JSX.Element => {
    const user = useAppSelector((state: RootState) => state.user);
    const { socket } = useAppSelector((state: RootState) => state.socket);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!socket || !user._id) return;
        const socketIo = socket as Socket;

        socketIo.on(socketEvents.on.ONLINE, (userId) => {
            dispatch(setOnline(userId));
        });

        socketIo.on(
            socketEvents.on.OFFLINE,
            (data: { userId: string; date: string }) => {
                const date = new Date(data.date);

                dispatch(
                    setOffline({
                        userId: data.userId,
                        date,
                    }),
                );
            },
        );

        socketIo.on(socketEvents.on.FOLLOWER, () => dispatch(inc('follower')));
        socketIo.on(socketEvents.on.FOLLOWING, () =>
            dispatch(inc('following')),
        );
        socketIo.on(socketEvents.on.UN_FOLLOWER, () =>
            dispatch(dec('follower')),
        );
        socketIo.on(socketEvents.on.UN_FOLLOWING, () =>
            dispatch(dec('following')),
        );
        socketIo.on(socketEvents.on.LIKE_TWEET, (data) =>
            dispatch(
                toggleLikeTweetSocket({
                    tweetId: data.tweetId,
                    userId: data.userId,
                    isLike: true,
                }),
            ),
        );
        socketIo.on(socketEvents.on.DISLIKE_TWEET, (data) => {
            dispatch(
                toggleLikeTweetSocket({
                    tweetId: data.tweetId,
                    userId: data.userId,
                    isLike: false,
                }),
            );
            dispatch(
                deleteNotificationSocket({
                    userId: data.userId,
                    document: data.tweetId,
                    type: 'LIKE_TWEET',
                }),
            );
        });
        socketIo.on('notification', (data: INotification) => {
            dispatch(addNotificationSocket(data));

            toastNotification(data);
        });

        socketIo.on(socketEvents.on.COMMENT_TWEET, (data) => {
            if (data.user._id === user._id) return;
            dispatch(addCommentSocket(data));
        });

        return () => {
            Object.values(socketEvents.on).forEach((event) =>
                socketIo.removeListener(event),
            );
        };
    }, [dispatch, socket, user._id]);

    return <>{children}</>;
};

export default SocketListener;
