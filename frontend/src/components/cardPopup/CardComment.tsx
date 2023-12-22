import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import { postComment } from '../../features/followingTweets';
import { useSearch } from '../../hooks';
import { classNames } from '../../utils';
import Avatar from '../Avatar';
import { SendIcon } from '../Icons';
import LoadingSpin from '../LoadingSpin';
import ScrollbarCustomize from '../ScrollbarCustomize';

const CardComment = ({
    level = 0,
    commentParentId,
}: {
    level?: number;
    commentParentId?: string;
    name?: string;
}) => {
    const owner = useAppSelector((state: RootState) => state.user);
    const tweet = useCardContext();
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
                    tweetId: tweet._id,
                    parent: commentParentId,
                }),
            ).unwrap();

            setValue('');
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div
            className={classNames(
                'flex rounded-b-lg gap-2 xxs:gap-4',
                level ? 'pr-4 mt-[6px] pl-[70px]' : 'p-5 shadow-comment',
            )}
        >
            <Avatar size={level ? 'xs' : 'sm'} src={owner.avatar} />
            <ScrollbarCustomize
                containerClassName='flex-1'
                className='max-h-[389px] flex gap-3 bg-[#F0F2F5] dark:bg-dark-black-3 rounded-[18px] overflow-y-auto'
            >
                <form className='flex-1 flex h-full items-center pr-3'>
                    <TextareaAutosize
                        autoFocus
                        value={value}
                        onChange={handleChangeSearch}
                        placeholder='Write a comment...'
                        className='px-3 py-2 flex-1 text-sm leading-sm bg-[#F0F2F5] dark:bg-dark-black-3 resize-none outline-none'
                    />
                    {(loading && <LoadingSpin size={16} />) || (
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
