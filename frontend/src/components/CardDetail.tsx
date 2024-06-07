import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { useCardContext } from '../contexts/CardContext';
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
    const { loadMoreComment } = useCardContext();
    const user = useAppSelector((state: RootState) => state.user);
    const comments = useAppSelector(
        (state: RootState) => state.comments[tweet._id]?.comments || [],
    );
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [edit, setEdit] = useState<string>('');
    const loadedComments = comments.length;
    const notInterested = tweet.notInterested && tweet.user._id !== user._id;
    const isShowDetail = !notInterested && !tweet.report;

    const handleScroll = () => setScrolled(true);

    return (
        <div className='bg-white dark:bg-dark-black-2 rounded-lg'>
            <ScrollbarCustomize
                onScroll={handleScroll}
                className={classNames(isPopup && 'max-h-[50vh]')}
            >
                <Card isPopup className={className} />
                {isShowDetail &&
                    comments.map(
                        (comment) =>
                            comment.deleted || (
                                <CommentTweet
                                    edit={edit}
                                    setEdit={setEdit}
                                    scrolled={scrolled}
                                    setScrolled={setScrolled}
                                    key={comment._id}
                                    comment={comment}
                                />
                            ),
                    )}
                {isShowDetail &&
                    loadedComments < tweet.numberOfComments &&
                    loadedComments > 0 && (
                        <div
                            onClick={loadMoreComment}
                            className='cursor-pointer hover:underline p-4 text-xs leading-xs text-[#65676B] font-semibold'
                        >
                            View more comments
                        </div>
                    )}
            </ScrollbarCustomize>
            {isShowDetail && <CardComment isParent={isPopup} />}
        </div>
    );
};

export default CardDetail;
