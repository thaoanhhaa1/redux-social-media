import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useEffectOnce } from 'usehooks-ts';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { comments } from '../../constants';
import { useCardContext } from '../../contexts/CardContext';
import { getComments } from '../../features/followingTweets';
import { setComments } from '../../features/myTweet';
import CommentTweet from '../CommentTweet';
import Modal from '../Modal';
import ScrollbarCustomize from '../ScrollbarCustomize';
import Card from '../card/Card';
import CardComment from './CardComment';

const CardPopup = ({
    className = '',
    isShow,
    setShow,
}: {
    className?: string;
    isShow: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}) => {
    const owner = useSelector((state: RootState) => state.user);
    const { tweet, user } = useCardContext();
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        async function getCommentsData() {
            if (!tweet._id) return;

            const result = await dispatch(
                getComments({
                    tweetId: tweet._id,
                    skip: tweet.skip * comments.LIMIT,
                }),
            );

            if (owner._id === user._id)
                dispatch(
                    setComments({
                        tweetId: tweet._id || '',
                        comments: result.payload,
                    }),
                );
        }

        getCommentsData();
    });

    return (
        <Modal isShowModal={isShow} handleCloseModal={() => setShow(false)}>
            <div className='mx-auto w-[min(calc(100vw-8px),700px)] rounded-lg overflow-y-hidden bg-white'>
                <header className='flex items-center justify-center h-15 text-xl leading-xl border-b border-[#CED0D4] bg-white rounded-t-lg'>
                    <strong>{user.name || user.username}'s Tweet</strong>
                </header>
                <ScrollbarCustomize className='max-h-[50vh]'>
                    <Card
                        isPopup
                        className={className}
                        tweet={tweet}
                        user={user}
                    />
                    {tweet.comments?.map((comment) => (
                        <CommentTweet key={comment._id} comment={comment} />
                    ))}
                </ScrollbarCustomize>
                <CardComment />
            </div>
        </Modal>
    );
};

export default CardPopup;
