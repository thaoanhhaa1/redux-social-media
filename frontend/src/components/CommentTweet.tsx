import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useToggle } from 'usehooks-ts';
import api from '../api';
import axiosClient from '../api/axiosClient';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import {
    getChildrenComments,
    toggleLikeComment,
} from '../features/followingTweets';
import { useOnClickOutside } from '../hooks';
import IComment from '../interfaces/IComment';
import { classNames, getTimeComment } from '../utils';
import Avatar from './Avatar';
import { LikeFBIcon, MoreIcon } from './Icons';
import CardComment from './cardPopup/CardComment';
import Popup from './popup';

export interface ICommentTweetProps {
    comment: IComment;
    level?: number;
    scrolled: boolean;
    setScrolled: Dispatch<SetStateAction<boolean>>;
    setShowParent?: Dispatch<SetStateAction<boolean>>;
}

export default function CommentTweet({
    comment,
    level = 0,
    scrolled,
    setScrolled,
    setShowParent = () => {},
}: ICommentTweetProps) {
    const user = useAppSelector((state: RootState) => state.user);
    const [showCardComment, setShowCardComment] = useState<boolean>(false);
    const [showPopup, toggleShowPopup, setShowPopup] = useToggle(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const moreRef = useRef(null);
    const [liked, setLiked] = useState<boolean>(() =>
        comment.likes.includes(user._id),
    );

    const handleClickReply = () => {
        if (level >= 2) setShowParent(true);
        else setShowCardComment(true);
    };

    const handleClickViewAllComments = async () => {
        setLoading(true);

        await dispatch(
            getChildrenComments({
                commentId: comment._id,
            }),
        );

        setLoading(false);
    };

    const handleClickMoreBtn = () => {
        toggleShowPopup();

        showPopup || setScrolled(false);
    };

    const handleClickLike = () => {
        axiosClient.post(api.toggleLikeComment(comment._id), {
            isLike: !liked,
        });

        setLiked(!liked);
        dispatch(
            toggleLikeComment({
                liked: !liked,
                commentId: comment._id,
                tweetId: comment.post,
            }),
        );
    };

    useOnClickOutside(moreRef, () => setShowPopup(false));

    useEffect(() => {
        if (scrolled) setShowPopup(false);
    }, [scrolled, setShowPopup]);

    return (
        <div className={classNames(!level || level === 3 || 'pl-[54px]')}>
            <div className='pl-4 pr-2 pt-1 flex gap-[6px] group/more'>
                <Avatar
                    size={level ? 'xs' : 'sm'}
                    src={comment.user.avatar}
                    className='mt-[2px]'
                />
                <div>
                    <div className='flex gap-[6px] items-center'>
                        <div className='relative rounded-[18px] pb-2 px-3 bg-[#F0F2F5]'>
                            <span className='text-xs leading-none font-semibold'>
                                {comment.user.name || comment.user.username}
                            </span>
                            <p className='text-sm leading-sm'>
                                {comment.content}
                            </p>
                            {comment.numberOfLikes > 0 && (
                                <span className='flex gap-[2px] items-center shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] absolute bottom-1 right-2 translate-x-full p-[2px] bg-white rounded-full'>
                                    <LikeFBIcon />
                                    {comment.numberOfLikes > 1 && (
                                        <span className='pr-[2px] text-[#65676B] text-xs leading-none'>
                                            {comment.numberOfLikes}
                                        </span>
                                    )}
                                </span>
                            )}
                        </div>
                        {user._id === comment.user._id && (
                            <div className='relative' ref={moreRef}>
                                <button
                                    className='flex-shrink-0 text-white group-hover/more:text-[#65676B] self-center flex justify-center items-center w-8 h-8 rounded-full ease-linear hover:bg-[rgba(0,_0,_0,_0.05)]'
                                    onClick={handleClickMoreBtn}
                                >
                                    <MoreIcon />
                                </button>
                                {showPopup && (
                                    <Popup
                                        commentId={comment._id}
                                        parentCommentId={comment.parent}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className='mt-1 flex gap-4 px-2 text-[#65676B] text-xs leading-xs font-bold'>
                        <span className='font-normal'>
                            {getTimeComment(comment.createdAt)}
                        </span>
                        <span
                            onClick={handleClickLike}
                            className={classNames(
                                'hover:underline',
                                liked && 'text-blue',
                            )}
                        >
                            Like
                        </span>
                        <span
                            className='hover:underline'
                            onClick={handleClickReply}
                        >
                            Reply
                        </span>
                    </div>
                    {!comment.comments.length && (
                        <div className='flex items-center gap-1'>
                            {comment.numberOfComments > 0 && (
                                <span
                                    onClick={handleClickViewAllComments}
                                    className='pl-4 text-[#65676B] text-sm leading-sm font-semibold hover:underline'
                                >
                                    {comment.numberOfComments === 1
                                        ? 'View 1 reply'
                                        : `View all ${comment.numberOfComments} replies`}
                                </span>
                            )}
                            {loading && (
                                <div className='w-3 h-3 border-2 border-[#65676B] border-opacity-60 border-t-transparent animate-spin rounded-full' />
                            )}
                        </div>
                    )}
                </div>
            </div>

            {comment.comments.map((comment) => (
                <CommentTweet
                    scrolled={scrolled}
                    setScrolled={setScrolled}
                    comment={comment}
                    level={Math.min(3, level + 1)}
                    key={comment._id}
                    setShowParent={setShowCardComment}
                />
            ))}

            {showCardComment && level < 2 && (
                <CardComment
                    level={Math.min(3, level + 1)}
                    commentParentId={comment._id}
                />
            )}
        </div>
    );
}
