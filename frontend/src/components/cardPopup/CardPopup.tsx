import { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { comments } from '../../constants';
import { getComments } from '../../features/tweet';
import { ITweet } from '../../interfaces';
import Button from '../Button';
import CardDetail from '../CardDetail';
import { CloseIcon } from '../Icons';
import Modal from '../Modal';

// TODO More comment popup when scroll
// TODO Loading when loading comments
const CardPopup = ({
    className = '',
    isShow,
    setShow,
    updateTweet,
}: {
    className?: string;
    isShow: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    updateTweet: (tweet: ITweet) => void;
}) => {
    const tweet = useAppSelector((state: RootState) => state.tweet.tweet);
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getCommentsData() {
            if (!tweet?._id || tweet?.comments.length || !isShow) return;

            await dispatch(
                getComments({
                    tweetId: tweet._id,
                    skip: tweet.skip * comments.LIMIT,
                }),
            );
        }

        getCommentsData();
    }, [dispatch, isShow, tweet]);

    useEffect(() => {
        tweet?.notInterested && setShow(false);
    }, [setShow, tweet]);

    useEffect(() => {
        tweet && updateTweet(tweet);
    }, [tweet, updateTweet]);

    if (!tweet) return null;

    const user = tweet.user;

    const handleClose = () => setShow(false);

    return (
        <Modal isShowModal={isShow} handleCloseModal={handleClose}>
            <div className='cursor-default mx-auto w-[min(calc(100vw-8px),700px)] rounded-lg overflow-y-hidden bg-white dark:bg-dark-black-2'>
                <header className='relative flex items-center justify-center h-15 text-xl leading-xl border-b border-[#CED0D4] dark:border-dark-black-3 rounded-t-lg'>
                    <strong>{user.name || user.username}'s Tweet</strong>
                    <Button
                        onClick={handleClose}
                        className='absolute right-2 xxs:right-3.75 transition-colors duration-300 text-stroke-icon hover:text-red dark:hover:text-red dark:text-white'
                        icon={<CloseIcon />}
                    />
                </header>
                <CardDetail isPopup tweet={tweet} className={className} />
            </div>
        </Modal>
    );
};

export default CardPopup;
