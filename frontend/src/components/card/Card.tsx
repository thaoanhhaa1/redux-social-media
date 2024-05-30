import { Ref, memo, useRef } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { images } from '../../assets';
import { useCardContext } from '../../contexts/CardContext';
import { classNames } from '../../utils';
import Button from '../Button';
import Image from '../Image';
import Wrapper from '../wrapper/Wrapper';
import CardInformation from './CardInformation';
import CardProfile from './CardProfile';

const Card = ({
    className = '',
    isPopup = false,
}: {
    className?: string;
    isPopup?: boolean;
}) => {
    const { tweet, toggleNotInterested } = useCardContext();
    const ref = useRef<HTMLDivElement | undefined>();
    const user = useAppSelector((state: RootState) => state.user);

    useEffectOnce(() => {
        const cardElement = ref.current;

        if (!cardElement) return;

        const moreElement = cardElement.getElementsByClassName('card__more')[0];

        if (!moreElement) return;

        const { top, height } = moreElement.getBoundingClientRect();

        if (top > height)
            moreElement.classList.add('!top-0', '-translate-y-full');
    });

    if (!tweet) return null;

    return (
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
                            onClick={toggleNotInterested}
                            className='bg-[#E4E6EB] text-sm leading-sm font-semibold'
                        >
                            Undo
                        </Button>
                    </div>
                )) || (
                    <>
                        <CardProfile />
                        <CardInformation isPopup={isPopup} />
                    </>
                )}
            </Wrapper>
        </div>
    );
};

export default memo(Card);
