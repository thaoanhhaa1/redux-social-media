import { Ref, memo, useRef } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import api from '../../api';
import axiosClient from '../../api/axiosClient';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { images } from '../../assets';
import CardProvider from '../../contexts/CardContext';
import { toggleNotInterested } from '../../features/tweet';
import { ITweet } from '../../interfaces';
import { classNames } from '../../utils';
import Button from '../Button';
import Image from '../Image';
import Wrapper from '../wrapper/Wrapper';
import CardInformation from './CardInformation';
import CardProfile from './CardProfile';

const Card = ({
    tweet,
    className = '',
    isPopup = false,
    updateTweet,
}: {
    tweet: ITweet;
    className?: string;
    isPopup?: boolean;
    updateTweet: (tweet: ITweet) => void;
}) => {
    const ref = useRef<HTMLDivElement | undefined>();
    const user = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        const cardElement = ref.current;

        if (!cardElement) return;

        const moreElement = cardElement.getElementsByClassName('card__more')[0];
        const containerElement = cardElement.parentElement;

        if (!moreElement || !containerElement) return;

        const { top: topMore, height: heightMore } =
            moreElement.getBoundingClientRect();
        const { top: topContainer, height: heightContainer } =
            containerElement.getBoundingClientRect();

        if (topMore + heightMore > topContainer + heightContainer) {
            moreElement.classList.add('!top-0', '-translate-y-full');
        }
    });

    if (!tweet) return null;

    const handleInterestedTweet = () => {
        axiosClient.post(api.interestedTweet(tweet._id)).then();
        dispatch(toggleNotInterested());
    };

    return (
        <CardProvider value={{ ...tweet, isPopup, updateTweet }}>
            <div>
                <Wrapper
                    ref={ref as Ref<HTMLDivElement> | undefined}
                    className={classNames('card p-2 xxs:p-5', className)}
                >
                    {(tweet.notInterested && user._id !== tweet.user._id && (
                        <div className='flex gap-3'>
                            <Image
                                className='w-5 h-5'
                                src={images.closeBorder}
                                alt=''
                            />
                            <div className='flex-1'>
                                <div className='text-sm leading-sm font-semibold'>
                                    Hidden
                                </div>
                                <p className='text-xs leading-xs mt-1'>
                                    Hiding tweet helps us personalize your Feed.
                                </p>
                            </div>
                            <Button
                                onClick={handleInterestedTweet}
                                className='bg-[#E4E6EB] text-sm leading-sm font-semibold'
                            >
                                Undo
                            </Button>
                        </div>
                    )) || (
                        <>
                            <CardProfile />
                            <CardInformation />
                        </>
                    )}
                </Wrapper>
            </div>
        </CardProvider>
    );
};

export default memo(Card);
