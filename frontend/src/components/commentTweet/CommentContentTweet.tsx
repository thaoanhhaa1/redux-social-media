import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import useCommentTweet from '../../contexts/CommentTweet';
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
    const { deleteComment, toggleLikeComment, tweet } = useCardContext();
    const { setEdit } = useCommentTweet();
    const user = useAppSelector((state: RootState) => state.user);
    const moreRef = useRef(null);
    const liked = comment.likes.includes(user._id);

    const handleClickReply = () => {
        if (level >= 2) setShowParent(true);
        else setShowCardComment(true);
    };

    const handleClickMoreBtn = () => {
        setShowPopup(!showPopup);

        showPopup || setScrolled(false);
    };

    const handleClickLike = () => toggleLikeComment(!liked, comment._id);

    const handleDelete = useCallback(
        () => deleteComment(comment._id, comment.parent),
        [comment._id, comment.parent, deleteComment],
    );

    const handleClickEdit = useCallback(
        () => setEdit(comment._id),
        [comment._id, setEdit],
    );

    const popup: IPopupItem[] = useMemo(() => {
        const items: IPopupItem[] = [];

        // Comment owner
        if (comment.user._id === user._id) {
            items.push({
                title: 'Edit',
                onClick: handleClickEdit,
            });
        }

        // Tweet owner or comment owner or user
        if ([tweet.user._id, comment.user._id, user._id].includes(user._id)) {
            items.push({
                title: 'Delete',
                onClick: handleDelete,
            });
        }

        return items;
    }, [
        comment.user._id,
        handleClickEdit,
        handleDelete,
        tweet.user._id,
        user._id,
    ]);

    useOnClickOutside(moreRef, () => setShowPopup(false));

    useEffect(() => {
        window.addEventListener('scroll', () => setShowPopup(false));

        return () =>
            window.removeEventListener('scroll', () => setShowPopup(false));
    }, [setShowPopup]);

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
                {popup.length ? (
                    <div className='relative' ref={moreRef}>
                        <button
                            className='flex-shrink-0 text-transparent group-hover/more:text-[#65676B] dark:group-hover/more:text-white-9 self-center flex justify-center items-center w-8 h-8 rounded-full ease-linear hover:bg-[rgba(0,_0,_0,_0.05)] dark:hover:bg-white-opacity-10'
                            onClick={handleClickMoreBtn}
                        >
                            <MoreIcon />
                        </button>
                        {showPopup && <Popup popup={popup} />}
                    </div>
                ) : null}
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
