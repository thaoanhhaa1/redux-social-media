import { ReactNode, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { setOffline, setOnline } from '../features/contacts';
import { dec, inc } from '../features/profile';

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

        return () => {
            socketIo.removeListener('offline');
            socketIo.removeListener('online');
            socketIo.removeListener('follower');
            socketIo.removeListener('following');
            socketIo.removeListener('un-follower');
            socketIo.removeListener('un-following');
        };
    }, [dispatch, socket, user._id]);

    return <>{children}</>;
};

export default SocketListener;
