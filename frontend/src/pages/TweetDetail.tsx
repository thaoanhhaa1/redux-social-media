import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Loading } from '../components';
import CardDetail from '../components/CardDetail';
import { comments } from '../constants';
import CardProvider from '../contexts/CardContext';
import { getComments, setTweet } from '../features/tweet';
import { getTweet } from '../features/tweets';

const TweetDetail = () => {
    const { tweet_id: tweetId = '' } = useParams();
    const { tweets } = useAppSelector((state: RootState) => state.tweets);
    const tweet = useAppSelector((state: RootState) => state.tweet.tweet);
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

            dispatch(setTweet(tweet));
        }

        getData();
    }, [dispatch, tweetId, tweets]);

    if (!tweet) return <Loading />;

    return (
        <CardProvider
            value={{ ...tweet, isPopup: false, updateTweet: (tweet) => {} }}
        >
            <div className='mx-auto max-w-[700px] px-2'>
                <CardDetail tweet={tweet} />
            </div>
        </CardProvider>
    );
};

export default TweetDetail;
