import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useToggle } from 'usehooks-ts';
import { useAppDispatch } from '../../app/hooks';
import { CommentTweetProvider } from '../../contexts/CommentTweet';
import { getChildrenComments } from '../../features/followingTweets';
import IComment from '../../interfaces/IComment';
import { classNames } from '../../utils';
import Avatar from '../Avatar';
import CardComment from '../cardPopup/CardComment';
import CommentContentTweet from './CommentContentTweet';
import CommentUpdateTweet from './CommentUpdateTweet';

export interface ICommentTweetProps {
    comment: IComment;
    level?: number;
    scrolled: boolean;
    edit: string;
    setScrolled: Dispatch<SetStateAction<boolean>>;
    setEdit: Dispatch<SetStateAction<string>>;
    setShowParent?: Dispatch<SetStateAction<boolean>>;
}

export default function CommentTweet({
    comment,
    level = 0,
    scrolled,
    edit,
    setEdit,
    setScrolled,
    setShowParent = () => {},
}: ICommentTweetProps) {
    const [showCardComment, setShowCardComment] = useState<boolean>(false);
    const [showPopup, , setShowPopup] = useToggle(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleClickCancel = () => setEdit('');

    const handleClickViewAllComments = async () => {
        setLoading(true);

        await dispatch(
            getChildrenComments({
                commentId: comment._id,
            }),
        );

        setLoading(false);
    };

    useEffect(() => {
        if (scrolled) setShowPopup(false);
    }, [scrolled, setShowPopup]);

    useEffect(() => {
        const handleEventKeyboard = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setEdit('');
        };

        if (edit) {
            window.addEventListener('keydown', handleEventKeyboard);
            setShowPopup(false);
        }

        return () => window.removeEventListener('keydown', handleEventKeyboard);
    }, [edit, setEdit, setShowPopup]);

    return (
        <CommentTweetProvider
            value={{
                level,
                setScrolled,
                setShowCardComment,
                setShowParent,
                setShowPopup,
                setEdit,
                showPopup,
            }}
        >
            <div className={classNames(!level || level === 3 || 'pl-[54px]')}>
                <div className='pl-4 pr-2 pt-1 flex gap-[6px] group/more'>
                    <Avatar
                        size={level ? 'xs' : 'sm'}
                        src={comment.user.avatar}
                        className='mt-[2px]'
                    />

                    <div className='flex-1'>
                        {(edit === comment._id && (
                            <CommentUpdateTweet
                                handleClickCancel={handleClickCancel}
                                content={comment.content}
                                commentId={comment._id}
                                tweetId={comment.post}
                            />
                        )) || <CommentContentTweet comment={comment} />}

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
                        edit={edit}
                        setEdit={setEdit}
                    />
                ))}

                {showCardComment && level < 2 && (
                    <CardComment
                        level={Math.min(3, level + 1)}
                        commentParentId={comment._id}
                    />
                )}
            </div>
        </CommentTweetProvider>
    );
}
