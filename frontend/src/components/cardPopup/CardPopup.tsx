import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { comments } from '../../constants';
import { useCardContext } from '../../contexts/CardContext';
import * as bookmarks from '../../features/bookmarks';
import * as tweets from '../../features/tweets';
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
    const { tweet, isBookmark } = useCardContext();
    const action = useMemo(
        () => (isBookmark ? bookmarks : tweets),
        [isBookmark],
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getCommentsData() {
            if (!tweet?._id || tweet.skip || tweet?.comments.length || !isShow)
                return;

            await dispatch(
                action.getComments({
                    tweetId: tweet._id,
                    skip: tweet.skip * comments.LIMIT,
                    tweetOwner: tweet.user._id,
                }),
            );
        }

        getCommentsData();
    }, [action, dispatch, isShow, tweet]);

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
