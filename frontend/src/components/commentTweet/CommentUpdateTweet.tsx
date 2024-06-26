import { useLayoutEffect, useRef, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import useCommentTweet from '../../contexts/CommentTweet';
import { useSearch } from '../../hooks';
import { classNames, isBlock } from '../../utils';
import { SendIcon } from '../Icons';
import LoadingSpin from '../LoadingSpin';

type Props = {
    content: string;
    commentId: string;
    handleClickCancel: () => void;
};

const CommentUpdateTweet = ({
    content,
    commentId,
    handleClickCancel,
}: Props) => {
    const { beenBlocked, blocked } = useAppSelector(
        (state: RootState) => state.userRelations,
    );
    const { value, handleChangeSearch } = useSearch(content);
    const [loading, setLoading] = useState<boolean>(false);
    const { setBlockedType, tweet, updateComment } = useCardContext();
    const { setEdit } = useCommentTweet();
    const ref = useRef(null);

    const isBlockedUser = isBlock(blocked, beenBlocked, tweet.user._id);

    const handleUpdateComment = async () => {
        if (isBlockedUser) return setBlockedType('COMMENT_TWEET');

        setLoading(true);

        try {
            await updateComment({ commentId, content: value });

            setEdit('');
        } catch (error) {
            toast.error('Update comment failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = () => {
        if (!ref.current) return;

        const element: HTMLTextAreaElement = ref.current;

        element.setSelectionRange(element.value.length, element.value.length);
    };

    useLayoutEffect(() => {
        if (!ref.current) return;

        const element: HTMLTextAreaElement = ref.current;

        element.focus();
    }, []);

    return (
        <div className='flex-1'>
            <div className='max-h-[389px] flex gap-3 bg-[#F0F2F5] dark:bg-dark-black-3 rounded-[18px] overflow-y-auto mr-4'>
                <form className='flex-1 flex h-full items-center pr-3'>
                    <ReactTextareaAutosize
                        ref={ref}
                        autoFocus
                        onSelect={handleSelect}
                        value={value}
                        onChange={handleChangeSearch}
                        placeholder='Write a comment...'
                        className='px-3 py-2 flex-1 text-sm leading-sm bg-[#F0F2F5] dark:bg-dark-black-3 resize-none outline-none'
                    />
                    {(loading && <LoadingSpin size={16} />) || (
                        <button
                            type='button'
                            onClick={handleUpdateComment}
                            disabled={!value}
                            className={classNames(
                                '-mx-2 p-2 self-end',
                                (value && 'text-blue') ||
                                    'cursor-not-allowed opacity-40',
                            )}
                        >
                            <SendIcon />
                        </button>
                    )}
                </form>
            </div>
            <div className='py-1 text-xs leading-xs text-[#65676B] dark:text-white-9'>
                Press Esc to{' '}
                <span
                    onClick={handleClickCancel}
                    className='text-blue hover:underline'
                >
                    cancel
                </span>
                .
            </div>
        </div>
    );
};

export default CommentUpdateTweet;
