import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Loading } from '../components';
import CardDetail from '../components/CardDetail';
import { comments } from '../constants';
import CardProvider from '../contexts/CardContext';
import { getComments, getTweet } from '../features/followingTweets';
import { ITweet } from '../interfaces';

const TweetDetail = () => {
    const { tweet_id: tweetId = '' } = useParams();
    const { tweets } = useAppSelector(
        (state: RootState) => state.followingTweets,
    );
    const [tweet, setTweet] = useState<ITweet | undefined>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getData() {
            const tweet = tweets.find((tweet) => tweet._id === tweetId);

            if (!tweet) return await dispatch(getTweet({ tweetId }));

            if (!tweet.skip)
                return await dispatch(
                    getComments({
                        tweetId: tweet._id,
                        skip: tweet.skip * comments.LIMIT,
                    }),
                );

            setTweet(tweet);
        }

        getData();
    }, [dispatch, tweetId, tweets]);

    if (!tweet) return <Loading />;

    return (
        <CardProvider value={{ ...tweet, isPopup: false }}>
            <div className='mx-auto max-w-[700px] px-2'>
                <CardDetail tweet={tweet} />
            </div>
        </CardProvider>
    );
};

export default TweetDetail;
