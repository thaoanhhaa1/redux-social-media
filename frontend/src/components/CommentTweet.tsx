import { Dispatch, SetStateAction, useState } from 'react';
import IComment from '../interfaces/IComment';
import { classNames, getTimeComment } from '../utils';
import Avatar from './Avatar';
import { MoreIcon } from './Icons';
import CardComment from './cardPopup/CardComment';
import { useAppDispatch } from '../app/hooks';
import { getChildrenComments } from '../features/followingTweets';

export interface ICommentTweetProps {
    comment: IComment;
    level?: number;
    setShowParent?: Dispatch<SetStateAction<boolean>>;
}

export default function CommentTweet({
    comment,
    level = 0,
    setShowParent = () => {},
}: ICommentTweetProps) {
    const [showCardComment, setShowCardComment] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

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

    return (
        <div className={classNames(!level || level === 3 || 'pl-[54px]')}>
            <div className='pl-4 pr-2 pt-1 flex gap-[6px] group/more'>
                <Avatar
                    size={level ? 'xs' : 'sm'}
                    src={comment.user.avatar}
                    className='mt-[2px]'
                />
                <div>
                    <div className='flex gap-[6px]'>
                        <div className='rounded-[18px] pb-2 px-3 bg-[#F0F2F5]'>
                            <span className='text-xs leading-none font-semibold'>
                                {comment.user.name || comment.user.username}
                            </span>
                            <p className='text-sm leading-sm'>
                                {comment.content}
                            </p>
                        </div>
                        <button
                            className='flex-shrink-0 text-white group-hover/more:text-[#65676B] self-center flex justify-center items-center w-8 h-8 rounded-full ease-linear hover:bg-[rgba(0,_0,_0,_0.05)]'
                            type='button'
                        >
                            <MoreIcon />
                        </button>
                    </div>
                    <div className='mt-1 flex gap-4 px-2 text-[#65676B] text-xs leading-xs font-bold'>
                        <span className='font-normal'>
                            {getTimeComment(comment.createdAt)}
                        </span>
                        <span className='hover:underline'>Like</span>
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
