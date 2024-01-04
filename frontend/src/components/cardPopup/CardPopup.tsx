import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { comments } from '../../constants';
import { useCardContext } from '../../contexts/CardContext';
import { getComments } from '../../features/followingTweets';
import Modal from '../Modal';
import ScrollbarCustomize from '../ScrollbarCustomize';
import Card from '../card/Card';
import CommentTweet from '../commentTweet/CommentTweet';
import CardComment from './CardComment';

// TODO More comment popup when scroll
// TODO Loading when loading comments
const CardPopup = ({
    className = '',
    isShow,
    setShow,
}: {
    className?: string;
    isShow: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}) => {
    const tweet = useCardContext();
    const dispatch = useAppDispatch();
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [edit, setEdit] = useState<string>('');
    const user = tweet.user;

    const handleScroll = () => setScrolled(true);

    useEffect(() => {
        async function getCommentsData() {
            if (!tweet._id || tweet.comments.length || !isShow) return;

            await dispatch(
                getComments({
                    tweetId: tweet._id,
                    skip: tweet.skip * comments.LIMIT,
                }),
            );
        }

        getCommentsData();
    }, [dispatch, isShow, tweet._id, tweet.comments.length, tweet.skip]);

    useEffect(() => {
        tweet.notInterested && setShow(false);
    }, [setShow, tweet.notInterested]);

    return (
        <Modal isShowModal={isShow} handleCloseModal={() => setShow(false)}>
            <div className='mx-auto w-[min(calc(100vw-8px),700px)] rounded-lg overflow-y-hidden bg-white dark:bg-dark-black-2'>
                <header className='flex items-center justify-center h-15 text-xl leading-xl border-b border-[#CED0D4] rounded-t-lg'>
                    <strong>{user.name || user.username}'s Tweet</strong>
                </header>
                <ScrollbarCustomize
                    onScroll={handleScroll}
                    className='max-h-[50vh]'
                >
                    <Card isPopup className={className} tweet={tweet} />
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
                </ScrollbarCustomize>
                <CardComment />
            </div>
        </Modal>
    );
};

export default CardPopup;
