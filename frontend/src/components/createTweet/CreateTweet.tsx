import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import AnimateHeight from 'react-animate-height';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { images } from '../../assets';
import { CreateTweetProvider } from '../../contexts/CreateTweetContext';
import { createTweet } from '../../features/myTweet';
import { IActionCreateTweet } from '../../interfaces';
import SubProps from '../../types/SubProps';
import { classNames } from '../../utils';
import Button from '../Button';
import Image from '../Image';
import Modal from '../Modal';
import Tooltip from '../Tooltip';
import ActionButton from './ActionButton';
import AudienceTag from './AudienceTag';
import Header from './Header';
import { Feeling } from './subTweet';

const actions: IActionCreateTweet[] = [
    {
        title: '',
        tooltip: 'Photo/Video',
        image: images.image,
        sub: Feeling,
        backgroundColor: '#E4F0D5',
    },
    {
        title: '',
        tooltip: 'Tag people',
        image: images.tagPeople,
        sub: Feeling,
        backgroundColor: '#CAEEF9',
    },
    {
        title: 'feeling',
        tooltip: 'Feeling/activity',
        image: images.feeling,
        sub: Feeling,
        backgroundColor: '#FEF2D1',
    },
    {
        title: '',
        tooltip: 'Check in',
        image: images.checkIn,
        sub: Feeling,
        backgroundColor: '#FBCCD2',
    },
    {
        title: '',
        tooltip: 'GIF',
        image: images.gif,
        sub: Feeling,
        backgroundColor: '#D2F0EA',
    },
    {
        tooltip: 'More',
        image: images.more,
        sub: Feeling,
    },
];

// Max-height: 559px
const CreateTweet = ({
    isShowModal,
    setShowModal,
}: {
    isShowModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const [value, setValue] = useState('');
    const [sub, setSub] = useState<SubProps | undefined>();
    const [height, setHeight] = useState<number>(0);
    const subRef = useRef<HTMLDivElement | null>(null);
    const { user, myTweet } = useSelector((state: RootState) => state);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
        setValue(e.target.value);

    const handleHiddenSub = useCallback(() => {
        setSub(undefined);
    }, []);
    const handleCloseModal = () => {
        setSub(undefined);
        setShowModal(false);
    };

    const handleSubmit = async () => {
        await dispatch(
            createTweet({
                content: value,
            }),
        ).unwrap();

        setShowModal(false);
    };
    const handleHeightModal = useCallback(() => {
        if (!sub || !subRef.current) {
            setHeight(0);
            return;
        }

        const element: HTMLDivElement = subRef.current;

        setHeight(element.offsetHeight);
    }, [sub]);

    useEffect(() => {
        if (!isShowModal) setSub(undefined);
    }, [isShowModal]);

    useEffect(() => {
        handleHeightModal();
    }, [handleHeightModal, sub, myTweet.tag]);

    return (
        <Modal
            isShowModal={isShowModal}
            handleCloseModal={handleCloseModal}
            className='relative max-w-[500px] w-full'
        >
            <CreateTweetProvider
                setSub={setSub}
                handleHeightModal={handleHeightModal}
            >
                <AnimateHeight
                    duration={200}
                    height={height || 'auto'}
                    className='relative w-full rounded-2.5 bg-white dark:bg-[#242526] cursor-default overflow-hidden'
                >
                    <div
                        className={classNames(
                            'relative transition-transform duration-200',
                            sub ? '-translate-x-full' : 'translate-x-0',
                        )}
                    >
                        {/* Header */}
                        <Header onClick={() => setShowModal(false)}>
                            Create tweet
                        </Header>

                        {/* Body */}
                        <div>
                            <div className='p-4 flex items-center gap-[11px]'>
                                <Image
                                    rounded
                                    className='w-10 h-10'
                                    alt=''
                                    src={user.avatar}
                                />
                                <div>
                                    <div className='flex flex-wrap items-center mb-1 font-semibold text-sm leading-sm text-base-black dark:text-white'>
                                        {user.name || user.username}
                                        {myTweet.feeling && ' is'}
                                        {myTweet.feeling && (
                                            <>
                                                <Image
                                                    alt=''
                                                    src={myTweet.image}
                                                    className='w-4 h-4 mx-1'
                                                />
                                                {myTweet.tag}
                                                <span
                                                    onClick={() =>
                                                        setSub(Feeling)
                                                    }
                                                    className='ml-1 cursor-pointer hover:underline'
                                                >
                                                    {myTweet.feeling}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <AudienceTag src={images.onlyMe}>
                                        Only me
                                    </AudienceTag>
                                </div>
                            </div>
                            <TextareaAutosize
                                value={value}
                                onChange={handleChange}
                                className={classNames(
                                    'min-h-[154px] px-4 pt-1 pb-2 w-full max-h-[345px] outline-none resize-none text-base-black dark:text-white dark:bg-[#242526] placeholder:text-[#65676B] dark:placeholder:text-[#b0b3b8]',
                                    value.length > 85
                                        ? 'text-sm leading-sm'
                                        : 'text-2xl',
                                )}
                                placeholder={`What's on your mind, ${
                                    (user.name &&
                                        user.name.split(' ').at(-1)) ||
                                    user.username
                                }?`}
                            />
                        </div>

                        {/* Footer */}
                        <div className='p-4'>
                            <div className='p-2 flex justify-between items-center border border-[#CED0D4] rounded-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.1)]'>
                                <span className='font-semibold text-sm leading-sm text-base-black dark:text-white'>
                                    Add to your tweet
                                </span>
                                <div className='flex gap-1'>
                                    {actions.map((action) => (
                                        <Tooltip
                                            key={v4()}
                                            tooltip={action.tooltip}
                                        >
                                            <ActionButton
                                                onClick={() =>
                                                    setSub(() => action.sub)
                                                }
                                                action={action}
                                            />
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                            <Button
                                onClick={handleSubmit}
                                disabled={!value}
                                isWidthFull
                                className='mt-4 font-semibold bg-blue text-white'
                            >
                                Tweet
                            </Button>
                        </div>

                        {/* Loading */}
                        {myTweet.isLoading && (
                            <div className='absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center'>
                                <div className='w-10 h-10 border-4 rounded-full border-blue border-t-transparent animate-spin'></div>
                            </div>
                        )}
                    </div>
                    <div
                        className={classNames(
                            'absolute top-0 left-full w-full transition-transform duration-200',
                            sub ? '-translate-x-full' : 'translate-x-0',
                        )}
                    >
                        {sub &&
                            (() => {
                                const Sub = sub;

                                return (
                                    <div ref={subRef}>
                                        <Sub
                                            handleHiddenSub={handleHiddenSub}
                                        />
                                    </div>
                                );
                            })()}
                    </div>
                </AnimateHeight>
            </CreateTweetProvider>
        </Modal>
    );
};

export default CreateTweet;
