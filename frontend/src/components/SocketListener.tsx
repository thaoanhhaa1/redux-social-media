import { ReactNode, useEffect } from 'react';
import { ToastContentProps, toast } from 'react-toastify';
import { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { socketEvents } from '../constants';
import * as bookmarks from '../features/bookmarks';
import {
    addCommentSocket,
    deleteCommentSocket,
    editCommentSocket,
    toggleLikeCommentSocket,
} from '../features/comments';
import { setOffline, setOnline } from '../features/contacts';
import * as lists from '../features/lists';
import {
    addNotificationSocket,
    deleteNotificationSocket,
} from '../features/notifications';
import { dec, inc } from '../features/profile';
import * as trending from '../features/trending';
import * as tweets from '../features/tweets';
import * as userProfile from '../features/userProfile';
import { addUser, removeUserById } from '../features/userRelations';
import { IComment, INotification, IPerson } from '../interfaces';
import NotificationAllItem from './notification/NotificationAllItem';

const tweetAction = [bookmarks, userProfile, trending, lists, tweets];

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
        socketIo.on(socketEvents.on.LIKE_TWEET, (data) => {
            if (data.userId === user._id) return;

            const payload = {
                tweetId: data.tweetId,
                userId: data.userId,
                tweetOwner: data.tweetOwner,
                isLike: true,
            };

            tweetAction.forEach((action) => {
                dispatch(action.toggleLikeTweetSocket(payload));
            });
        });
        socketIo.on(socketEvents.on.DISLIKE_TWEET, (data) => {
            if (data.userId === user._id) return;

            const payload = {
                tweetId: data.tweetId,
                userId: data.userId,
                tweetOwner: data.tweetOwner,
                isLike: false,
            };

            tweetAction.forEach((action) => {
                dispatch(action.toggleLikeTweetSocket(payload));
            });

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

        socketIo.on(
            socketEvents.on.COMMENT_TWEET,
            (data: { comment: IComment; tweetOwner: string }) => {
                if (data.comment.user._id === user._id) return;

                if (!data.comment.parent)
                    tweetAction.forEach((action) => {
                        dispatch(
                            action.incNumberOfComments({
                                tweetId: data.comment.post,
                                tweetOwner: data.tweetOwner,
                            }),
                        );
                    });

                dispatch(addCommentSocket(data));
            },
        );

        socketIo.on(
            socketEvents.on.LIKE_COMMENT,
            ({
                commentId,
                userId,
                tweetId,
                tweetOwner,
            }: {
                commentId: string;
                userId: string;
                tweetId: string;
                tweetOwner: string;
            }) => {
                if (userId === user._id) return;

                const payload = {
                    commentId,
                    userId,
                    tweetId,
                    tweetOwner,
                    isLike: true,
                };

                dispatch(toggleLikeCommentSocket(payload));
            },
        );

        socketIo.on(
            socketEvents.on.DISLIKE_COMMENT,
            ({
                commentId,
                userId,
                tweetId,
                tweetOwner,
            }: {
                commentId: string;
                userId: string;
                tweetId: string;
                tweetOwner: string;
            }) => {
                if (userId === user._id) return;

                const payload = {
                    commentId,
                    userId,
                    tweetId,
                    tweetOwner,
                    isLike: false,
                };

                dispatch(toggleLikeCommentSocket(payload));

                dispatch(
                    deleteNotificationSocket({
                        userId,
                        document: commentId,
                        type: 'LIKE_COMMENT',
                    }),
                );
            },
        );

        socketIo.on(socketEvents.on.BLOCK, (user: IPerson) => {
            dispatch(
                addUser({
                    user,
                    type: 'beenBlocked',
                }),
            );
        });

        socketIo.on(socketEvents.on.UNBLOCK, (userId: string) => {
            dispatch(
                removeUserById({
                    type: 'beenBlocked',
                    userId,
                }),
            );
        });

        socketIo.on(
            socketEvents.on.EDIT_COMMENT,
            (data: { content: string; commentId: string; tweetId: string }) => {
                dispatch(editCommentSocket(data));
            },
        );

        socketIo.on(
            socketEvents.on.DELETE_COMMENT,
            (data: {
                commentId: string;
                tweetId: string;
                parentComment: string;
                tweetOwner: string;
                userId: string;
            }) => {
                dispatch(deleteCommentSocket(data));

                if (!data.parentComment && data.userId !== user._id)
                    tweetAction.forEach((action) => {
                        dispatch(
                            action.decNumberOfComments({
                                tweetId: data.tweetId,
                                tweetOwner: data.tweetOwner,
                            }),
                        );
                    });
            },
        );

        return () => {
            Object.values(socketEvents.on).forEach((event) =>
                socketIo.removeListener(event),
            );
        };
    }, [dispatch, socket, user._id]);

    return <>{children}</>;
};

export default SocketListener;
