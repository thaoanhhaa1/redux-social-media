import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { CardSkeleton } from '../components';
import CardDetail from '../components/CardDetail';
import CardWrapper from '../components/card/CardWrapper';
import { comments } from '../constants';
import { getComments, getTweet } from '../features/tweets';
import { findTweetById } from '../utils';
import NotFound from './NotFound';

// TODO Skeleton loading
const TweetDetail = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const { tweet_id: tweetId = '', user_id: userId = '' } = useParams();
    const { tweets } = useAppSelector((state: RootState) => state.tweets);
    const tweet = useMemo(
        () => findTweetById(tweets, tweetId),
        [tweetId, tweets],
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const tweet = tweets.find((tweet) => tweet._id === tweetId);

                if (!tweet)
                    await dispatch(getTweet({ tweetId, userId })).unwrap();

                if (tweet && !tweet.skip)
                    dispatch(
                        getComments({
                            tweetId: tweet._id,
                            skip: tweet.skip * comments.LIMIT,
                        }),
                    );
            } catch (error) {
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [dispatch, tweetId, tweets, userId]);

    if (!loading && !tweet) return <NotFound />;

    return (
        <div className='mx-auto max-w-[700px] px-2 pb-5'>
            {(tweet && (
                <CardWrapper tweet={tweet}>
                    <CardDetail tweet={tweet} />
                </CardWrapper>
            )) || <CardSkeleton />}
        </div>
    );
};

export default TweetDetail;
