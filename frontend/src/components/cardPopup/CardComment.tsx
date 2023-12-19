import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import { postComment } from '../../features/followingTweets';
import { useSearch } from '../../hooks';
import { classNames } from '../../utils';
import { SendIcon } from '../Icons';
import Image from '../Image';
import ScrollbarCustomize from '../ScrollbarCustomize';

const CardComment = () => {
    const owner = useAppSelector((state: RootState) => state.user);
    const { tweet } = useCardContext();
    const { value, handleChangeSearch, setValue } = useSearch();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handlePostComment = async () => {
        setLoading(true);

        try {
            await dispatch(
                postComment({
                    user: owner,
                    content: value,
                    tweetId: tweet._id || '',
                }),
            ).unwrap();

            setValue('');
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div className='flex bg-white p-5 gap-2 xxs:gap-4 rounded-b-lg'>
            <Image className='w-8 h-8' alt='' src={owner.avatar} rounded />
            <ScrollbarCustomize
                containerClassName='flex-1'
                className='max-h-[389px] flex gap-3 px-3 py-2 bg-[#F0F2F5] rounded-[18px] overflow-y-auto'
            >
                <form className='flex-1 flex h-full items-center'>
                    <TextareaAutosize
                        value={value}
                        onChange={handleChangeSearch}
                        placeholder='Write a comment...'
                        className='flex-1 text-sm leading-sm bg-[#F0F2F5] resize-none outline-none'
                    />
                    {(loading && (
                        <div className='w-4 h-4 rounded-full border-2 border-[#2365FF] border-t-transparent animate-spin'></div>
                    )) || (
                        <button
                            onClick={handlePostComment}
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
            </ScrollbarCustomize>
        </div>
    );
};

export default CardComment;
