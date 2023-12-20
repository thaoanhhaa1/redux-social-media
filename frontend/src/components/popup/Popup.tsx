import { useEffect, useRef, useState } from 'react';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { useAppDispatch } from '../../app/hooks';
import { useCardContext } from '../../contexts/CardContext';
import { deleteComment } from '../../features/followingTweets';
import { ArrowPopupIcon } from '../Icons';
import Portal from '../Portal';
import PopupItem from './PopupItem';

function Popup({
    commentId,
    parentCommentId,
}: {
    commentId: string;
    parentCommentId?: string;
}) {
    const { tweet } = useCardContext();
    const dispatch = useAppDispatch();
    const ref = useRef(null);
    const [rect, setRect] = useState<DOMRect>();

    const handleDelete = () => {
        const tweetId = tweet._id || '';

        axiosClient.delete(api.deleteComment(tweetId, commentId));

        dispatch(
            deleteComment({
                commentId,
                parentCommentId,
                tweetId: tweetId,
            }),
        );
    };

    useEffect(() => {
        if (!ref.current) return;

        setRect((ref.current as HTMLDivElement).getBoundingClientRect());
    }, []);

    return (
        <>
            <div
                ref={ref}
                className='z-1 w-[300px] absolute top-[calc(100%+6px)] left-2/4 -translate-x-2/4'
            ></div>
            {rect && (
                <Portal>
                    <div
                        style={{
                            left: `${rect.x}px`,
                            top: `${rect.y}px`,
                        }}
                        className='z-50 w-[300px] absolute p-2 bg-white rounded-lg shadow-popup drop-shadow-[0_0_6px_rgba(0,_0,_0,_0.2)]'
                    >
                        <div>
                            <PopupItem>Edit</PopupItem>
                            <PopupItem onClick={handleDelete}>Delete</PopupItem>
                        </div>
                        <div className='absolute top-[2px] -translate-y-full left-[calc(50%-4px)]'>
                            <ArrowPopupIcon
                                fill='#fff'
                                className='-scale-y-100'
                            />
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
}

export default Popup;
