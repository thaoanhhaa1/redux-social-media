import { ReactNode, useEffect } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { setOffline, setOnline } from '../features/contacts';
import {
    addNotificationSocket,
    deleteNotificationSocket,
} from '../features/notifications';
import { dec, inc } from '../features/profile';
import { toggleLikeTweetSocket } from '../features/tweets';
import { INotification } from '../interfaces';
import NotificationAllItem from './notification/NotificationAllItem';

const SocketListener = ({ children }: { children: ReactNode }): JSX.Element => {
    const user = useAppSelector((state: RootState) => state.user);
    const { socket } = useAppSelector((state: RootState) => state.socket);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!socket || !user._id) return;
        const socketIo = socket as Socket;

        socketIo.on('online', (userId) => {
            dispatch(setOnline(userId));
        });

        socketIo.on('offline', (data: { userId: string; date: string }) => {
            const date = new Date(data.date);

            dispatch(
                setOffline({
                    userId: data.userId,
                    date,
                }),
            );
        });

        socketIo.on('follower', () => dispatch(inc('follower')));
        socketIo.on('following', () => dispatch(inc('following')));
        socketIo.on('un-follower', () => dispatch(dec('follower')));
        socketIo.on('un-following', () => dispatch(dec('following')));
        socketIo.on('like-tweet', (data) =>
            dispatch(
                toggleLikeTweetSocket({
                    tweetId: data.tweetId,
                    userId: data.userId,
                    isLike: true,
                }),
            ),
        );
        socketIo.on('dislike-tweet', (data) => {
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

            toast(
                (props: ToastContentProps<unknown>) => (
                    <NotificationAllItem {...props} data={data} />
                ),
                {
                    className: 'p-0 max-w-[500px]',
                    bodyClassName: 'p-0',
                    toastId: data._id,
                    autoClose: false,
                    closeButton: false,
                },
            );
        });

        return () => {
            socketIo.removeListener('offline');
            socketIo.removeListener('online');
            socketIo.removeListener('follower');
            socketIo.removeListener('following');
            socketIo.removeListener('un-follower');
            socketIo.removeListener('un-following');
            socketIo.removeListener('like-tweet');
            socketIo.removeListener('dislike-tweet');
        };
    }, [dispatch, socket, user._id]);

    return <>{children}</>;
};

export default SocketListener;
