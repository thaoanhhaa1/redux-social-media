// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { CardSkeleton } from '../components';
import CardDetail from '../components/CardDetail';
import Forbidden from '../components/Forbidden';
import CardWrapper from '../components/card/CardWrapper';
import { comments } from '../constants';
import { getComments, getTweet } from '../features/tweets';
import { findTweetById } from '../utils';
import NotFound from './NotFound';

// TODO Skeleton loading
const TweetDetail = () => {
    const [errorCode, setErrorCode] = useState<Number>(404);
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
            } catch (error: AxiosError | any) {
                if (error.message.endsWith('403')) setErrorCode(403);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [dispatch, tweetId, tweets, userId]);

    if (!loading && !tweet) {
        if (errorCode === 403) return <Forbidden />;
        return <NotFound />;
    }

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
