import { Dispatch, SetStateAction, useEffect } from 'react';
import { useBoolean } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCardContext } from '../../contexts/CardContext';
import { getComments } from '../../features/comments';
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
    const { tweet, action } = useCardContext();
    const comments = useAppSelector(
        (state) => state.comments[tweet?._id]?.comments || [],
    );
    const { value, setTrue, setFalse } = useBoolean(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        async function getCommentsData() {
            if (
                !tweet?._id ||
                tweet.skip ||
                comments.length ||
                !isShow ||
                value
            )
                return;

            setTrue();
            await dispatch(
                getComments({
                    tweetId: tweet._id,
                    skip: tweet.skip * 10,
                    tweetOwner: tweet.user._id,
                }),
            );
            setFalse();
        }

        getCommentsData();
    }, [
        action,
        comments.length,
        dispatch,
        isShow,
        setFalse,
        setTrue,
        tweet,
        value,
    ]);

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
