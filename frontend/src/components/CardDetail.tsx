import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { getComments } from '../features/tweets';
import { ITweet } from '../interfaces';
import { classNames } from '../utils';
import ScrollbarCustomize from './ScrollbarCustomize';
import Card from './card';
import CardComment from './cardPopup/CardComment';
import CommentTweet from './commentTweet';

type Props = {
    tweet: ITweet;
    className?: string;
    isPopup?: boolean;
};

const CardDetail = ({ tweet, className = '', isPopup }: Props) => {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [edit, setEdit] = useState<string>('');
    const dispatch = useAppDispatch();
    const loadedComments = tweet.comments.length;

    const handleScroll = () => setScrolled(true);

    const loadMoreComment = () => {
        dispatch(getComments({ tweetId: tweet._id, skip: loadedComments }));
    };

    return (
        <div className='bg-white dark:bg-dark-black-2 rounded-lg'>
            <ScrollbarCustomize
                onScroll={handleScroll}
                className={classNames(isPopup && 'max-h-[50vh]')}
            >
                <Card isPopup className={className} />
                {tweet.comments?.map((comment) => (
                    <CommentTweet
                        edit={edit}
                        setEdit={setEdit}
                        scrolled={scrolled}
                        setScrolled={setScrolled}
                        key={comment._id}
                        comment={comment}
                    />
                ))}
                {loadedComments < tweet.numberOfComments &&
                    loadedComments > 0 && (
                        <div
                            onClick={loadMoreComment}
                            className='cursor-pointer hover:underline p-4 text-xs leading-xs text-[#65676B] font-semibold'
                        >
                            View more comments
                        </div>
                    )}
            </ScrollbarCustomize>
            <CardComment isParent={isPopup} />
        </div>
    );
};

export default CardDetail;
