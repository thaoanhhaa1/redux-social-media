import { useRef } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { useAppDispatch } from '../../app/hooks';
import useCommentTweet from '../../contexts/CommentTweet';
import { editComment } from '../../features/followingTweets';
import { useSearch } from '../../hooks';
import { classNames } from '../../utils';
import { SendIcon } from '../Icons';

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
    const { setEdit } = useCommentTweet();
    const dispatch = useAppDispatch();
    const ref = useRef(null);

    const handleUpdateComment = () => {
        axiosClient.patch(api.editComment(tweetId, commentId), {
            content: value,
        });

        dispatch(
            editComment({
                commentId,
                content: value,
                tweetId,
            }),
        );

        setEdit('');
    };

    const handleSelect = () => {
        if (!ref.current) return;

        const element: HTMLTextAreaElement = ref.current;

        element.setSelectionRange(element.value.length, element.value.length);
    };

    return (
        <div className='flex-1'>
            <div className='max-h-[389px] flex gap-3 bg-[#F0F2F5] rounded-[18px] overflow-y-auto mr-4'>
                <form className='flex-1 flex h-full items-center pr-3'>
                    <ReactTextareaAutosize
                        ref={ref}
                        autoFocus
                        onSelect={handleSelect}
                        value={value}
                        onChange={handleChangeSearch}
                        placeholder='Write a comment...'
                        className='px-3 py-2 flex-1 text-sm leading-sm bg-[#F0F2F5] resize-none outline-none'
                    />
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
                </form>
            </div>
            <div className='py-1 text-xs leading-xs text-[#65676B]'>
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
