import { useRef, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import useCommentTweet from '../../contexts/CommentTweet';
import { editComment } from '../../features/tweets';
import { useSearch } from '../../hooks';
import { classNames } from '../../utils';
import { SendIcon } from '../Icons';
import LoadingSpin from '../LoadingSpin';

type Props = {
    content: string;
    commentId: string;
    tweetId: string;
    handleClickCancel: () => void;
};

const CommentUpdateTweet = ({
    content,
    commentId,
    tweetId,
    handleClickCancel,
}: Props) => {
    const { value, handleChangeSearch } = useSearch(content);
    const [loading, setLoading] = useState<boolean>(false);
    const { setEdit } = useCommentTweet();
    const dispatch = useAppDispatch();
    const ref = useRef(null);

    const handleUpdateComment = async () => {
        setLoading(true);

        try {
            await dispatch(
                editComment({
                    content: value,
                    commentId,
                    tweetId,
                }),
            ).unwrap();

            setEdit('');
            setLoading(false);
        } catch (error) {
            toast.error('Update comment failed');
            setLoading(false);
        }
    };

    const handleSelect = () => {
        if (!ref.current) return;

        const element: HTMLTextAreaElement = ref.current;

        element.setSelectionRange(element.value.length, element.value.length);
    };

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
