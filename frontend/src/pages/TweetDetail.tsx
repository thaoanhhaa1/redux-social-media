import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Loading } from '../components';
import CardDetail from '../components/CardDetail';
import CardWrapper from '../components/card/CardWrapper';
import { comments } from '../constants';
import { getComments, getTweet } from '../features/tweets';

const TweetDetail = () => {
    const { tweet_id: tweetId = '' } = useParams();
    const { tweets } = useAppSelector((state: RootState) => state.tweets);
    const tweet = useMemo(
        () => tweets.find((tweet) => tweet._id === tweetId),
        [tweetId, tweets],
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getData() {
            const tweet = tweets.find((tweet) => tweet._id === tweetId);

            if (!tweet) {
                await dispatch(getTweet({ tweetId })).unwrap();

                return;
            }

            if (!tweet.skip)
                return await dispatch(
                    getComments({
                        tweetId: tweet._id,
                        skip: tweet.skip * comments.LIMIT,
                    }),
                );
        }

        getData();
    }, [dispatch, tweetId, tweets]);

    if (!tweet) return <Loading />;

    return (
        <CardWrapper tweet={tweet} updateTweet={(tweet) => {}}>
            <div className='mx-auto max-w-[700px] px-2'>
                <CardDetail tweet={tweet} />
            </div>
        </CardWrapper>
    );
};

export default TweetDetail;
