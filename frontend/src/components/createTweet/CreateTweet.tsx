import {
    Dispatch,
    SetStateAction,
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import AnimateHeight from 'react-animate-height';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { CreateTweetProvider } from '../../contexts/CreateTweetContext';
import { setSub } from '../../features/myTweet';
import { classNames } from '../../utils';
import Modal from '../Modal';
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
    const [height, setHeight] = useState<number>(0);
    const subRef = useRef<HTMLDivElement | null>(null);
    const myTweet = useSelector((state: RootState) => state.myTweet);
    const dispatch = useAppDispatch();

    const handleHiddenSub = useCallback(() => {
        dispatch(setSub(undefined));
    }, [dispatch]);

    const handleCloseModal = () => {
        setSub(undefined);
        setShowModal(false);
    };

    const handleHeightModal = useCallback(() => {
        if (!myTweet.sub || !subRef.current) {
            setHeight(0);
            return;
        }

        const element: HTMLDivElement = subRef.current;

        setHeight(element.offsetHeight);
    }, [myTweet.sub]);

    useEffect(() => {
        if (!isShowModal) dispatch(setSub(undefined));
    }, [dispatch, isShowModal]);

    useEffect(() => {
        handleHeightModal();
    }, [handleHeightModal, myTweet.sub, myTweet.tag]);

    return (
        <Modal
            isShowModal={isShowModal}
            handleCloseModal={handleCloseModal}
            className='relative max-w-[500px] w-[calc(100vw-16px)]'
        >
            <CreateTweetProvider
                handleHeightModal={handleHeightModal}
                handleHiddenSub={handleHiddenSub}
            >
                <div className='w-full rounded-2.5 overflow-hidden'>
                    <AnimateHeight
                        duration={200}
                        height={height || 'auto'}
                        className='relative bg-white dark:bg-[#242526] cursor-default overflow-hidden'
                    >
                        <div
                            className={classNames(
                                'max-h-[min(600px,_80vh)] overflow-y-auto transition-transform duration-200',
                                myTweet.sub
                                    ? '-translate-x-full'
                                    : 'translate-x-0',
                            )}
                        >
                            <div className='relative'>
                                {/* Header */}
                                <Header onClick={() => setShowModal(false)}>
                                    Create tweet
                                </Header>

                                {/* Body */}
                                <Body />

                                {/* Footer */}
                                <Footer setShowModal={setShowModal} />

                                {/* Loading */}
                                {myTweet.isLoading && <Loading />}
                            </div>
                        </div>
                        <div
                            className={classNames(
                                'absolute max-h-[85vh] overflow-y-auto top-0 left-full w-full transition-transform duration-200',
                                myTweet.sub
                                    ? '-translate-x-full'
                                    : 'translate-x-0',
                            )}
                        >
                            {myTweet.sub &&
                                (() => {
                                    const Sub = myTweet.sub;

                                    return (
                                        <div ref={subRef}>
                                            <Sub />
                                        </div>
                                    );
                                })()}
                        </div>
                    </AnimateHeight>
                </div>
            </CreateTweetProvider>
        </Modal>
    );
};

export default memo(CreateTweet);
