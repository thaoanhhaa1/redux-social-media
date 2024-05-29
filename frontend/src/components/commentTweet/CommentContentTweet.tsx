import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import useCommentTweet from '../../contexts/CommentTweet';
import { deleteComment, toggleLikeComment } from '../../features/tweets';
import { useOnClickOutside } from '../../hooks';
import { IPopupItem } from '../../interfaces';
import IComment from '../../interfaces/IComment';
import { classNames, getTimeComment } from '../../utils';
import { LikeFBIcon, MoreIcon } from '../Icons';
import Popup from '../popup';

const CommentContentTweet = ({ comment }: { comment: IComment }) => {
    const {
        level,
        showPopup,
        setScrolled,
        setShowPopup,
        setShowParent,
        setShowCardComment,
    } = useCommentTweet();
    const { tweet } = useCardContext();
    const { setEdit } = useCommentTweet();
    const user = useAppSelector((state: RootState) => state.user);
    const moreRef = useRef(null);
    const liked = comment.likes.includes(user._id);
    const dispatch = useAppDispatch();

    const handleClickReply = () => {
        if (level >= 2) setShowParent(true);
        else setShowCardComment(true);
    };

    const handleClickMoreBtn = () => {
        setShowPopup(!showPopup);

        showPopup || setScrolled(false);
    };

    const handleClickLike = () => {
        dispatch(
            toggleLikeComment({
                userId: user._id,
                commentId: comment._id,
                isLike: !liked,
                tweetId: tweet._id,
            }),
        );
    };

    const handleDelete = () => {
        dispatch(
            deleteComment({
                commentId: comment._id,
                tweetId: tweet._id,
                index: tweet.comments.findIndex((c) => c._id === comment._id),
            }),
        );
    };

    const handleClickEdit = () => setEdit(comment._id);
    const popup: IPopupItem[] = [
        {
            title: 'Edit',
            onClick: handleClickEdit,
        },
        {
            title: 'Delete',
            onClick: handleDelete,
        },
    ];

    useOnClickOutside(moreRef, () => setShowPopup(false));

    return (
        <div>
            <div className='flex gap-[6px] items-center'>
                <div className='relative rounded-[18px] pb-2 px-3 bg-[#F0F2F5] dark:bg-dark-black-3'>
                    <span className='text-xs leading-none font-semibold'>
                        {comment.user.name || comment.user.username}
                    </span>
                    <p className='text-sm leading-sm'>{comment.content}</p>
                    {comment.numberOfLikes > 0 && (
                        <span className='flex gap-[2px] items-center shadow-[0_1px_3px_0_rgba(0,0,0,0.2)] absolute bottom-1 right-2 translate-x-full p-[2px] bg-white dark:bg-dark-black-3 rounded-full'>
                            <LikeFBIcon />
                            {comment.numberOfLikes > 1 && (
                                <span className='pr-[2px] text-[#65676B] dark:text-white-9 text-xs leading-none'>
                                    {comment.numberOfLikes}
                                </span>
                            )}
                        </span>
                    )}
                </div>
                {user._id === comment.user._id && (
                    <div className='relative' ref={moreRef}>
                        <button
                            className='flex-shrink-0 text-transparent group-hover/more:text-[#65676B] dark:group-hover/more:text-white-9 self-center flex justify-center items-center w-8 h-8 rounded-full ease-linear hover:bg-[rgba(0,_0,_0,_0.05)] dark:hover:bg-white-opacity-10'
                            onClick={handleClickMoreBtn}
                        >
                            <MoreIcon />
                        </button>
                        {showPopup && <Popup popup={popup} />}
                    </div>
                )}
            </div>
            <div className='mt-1 flex gap-4 px-2 text-[#65676B] dark:text-white-9 text-xs leading-xs font-bold'>
                <span className='font-normal'>
                    {getTimeComment(comment.createdAt)}
                </span>
                <span
                    onClick={handleClickLike}
                    className={classNames(
                        'hover:underline cursor-pointer',
                        liked && 'text-blue',
                    )}
                >
                    Like
                </span>
                <span
                    className='hover:underline cursor-pointer'
                    onClick={handleClickReply}
                >
                    Reply
                </span>
            </div>
        </div>
    );
};

export default CommentContentTweet;
