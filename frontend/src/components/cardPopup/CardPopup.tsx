import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { comments } from '../../constants';
import { getComments } from '../../features/tweets';
import CardDetail from '../CardDetail';
import { ModalHeader } from '../modal';
import Modal from '../modal/Modal';

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
    const { tweetActiveId, tweets } = useAppSelector(
        (state: RootState) => state.tweets,
    );
    const tweet = useMemo(
        () => tweets.find((tweet) => tweet._id === tweetActiveId),
        [tweetActiveId, tweets],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getCommentsData() {
            if (!tweet?._id || tweet.skip || tweet?.comments.length || !isShow)
                return;

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

    if (!tweet) return null;

    const user = tweet.user;

    const handleClose = () => setShow(false);

    return (
        <Modal isShowModal={isShow} handleCloseModal={handleClose}>
            <div className='cursor-default mx-auto w-[min(calc(100vw-8px),700px)] overflow-y-hidden'>
                <ModalHeader>{user.name || user.username}'s Tweet</ModalHeader>
                <CardDetail isPopup tweet={tweet} className={className} />
            </div>
        </Modal>
    );
};

export default CardPopup;
