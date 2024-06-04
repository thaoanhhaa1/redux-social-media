import { Dispatch, SetStateAction, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { resetSubs } from '../../features/popupMultiLevel';
import Modal from '../modal/Modal';
import PopupMultiLevel from '../popupMultiLevel';
import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';

// Max-height: 559px
const CreateTweet = ({
    isShowModal,
    setShowModal,
}: {
    isShowModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const { updateHeightPopup } = useSelector(
        (state: RootState) => state.popupMultiLevel,
    );
    const dispatch = useAppDispatch();

    const handleCloseModal = () => {
        dispatch(resetSubs());
        setShowModal(false);
    };

    useEffect(() => {
        if (!isShowModal) dispatch(resetSubs());
    }, [dispatch, isShowModal]);

    useEffect(() => {
        updateHeightPopup();
    }, [myTweet.tag, updateHeightPopup]);

    return (
        <Modal
            isShowModal={isShowModal}
            handleCloseModal={handleCloseModal}
            className='relative max-w-[500px] w-[calc(100vw-16px)]'
        >
            <PopupMultiLevel>
                {/* Header */}
                <Header handleClose={handleCloseModal}>Create tweet</Header>

                {/* Body */}
                <Body />

                {/* Footer */}
                <Footer setShowModal={setShowModal} />

                {/* Loading */}
                {myTweet.isLoading && <Loading />}
            </PopupMultiLevel>
        </Modal>
    );
};

export default memo(CreateTweet);
