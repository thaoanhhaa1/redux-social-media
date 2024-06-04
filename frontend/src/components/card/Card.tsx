import { Ref, memo, useMemo, useRef } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import { classNames } from '../../utils';
import Wrapper from '../wrapper/Wrapper';
import CardBlock from './CardBlock';
import CardBlockedModal from './CardBlockedModal';
import CardInformation from './CardInformation';
import CardNotInterested from './CardNotInterested';
import CardProfile from './CardProfile';
import CardReport from './CardReport';

const Card = ({
    className = '',
    isPopup = false,
}: {
    className?: string;
    isPopup?: boolean;
}) => {
    const { tweet, reportLoading } = useCardContext();
    const ref = useRef<HTMLDivElement | undefined>();
    const user = useAppSelector((state: RootState) => state.user);
    const showNotInterested = useMemo(
        () => tweet.notInterested && user._id !== tweet.user._id,
        [tweet, user],
    );

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
                {tweet.blocked && <CardBlock />}
                {tweet.blocked || tweet.report || showNotInterested || (
                    <>
                        <CardProfile />
                        <CardInformation isPopup={isPopup} />
                    </>
                )}
                {tweet.blocked || (showNotInterested && <CardNotInterested />)}
                {tweet.blocked ||
                    (tweet.report && <CardReport loading={reportLoading} />)}
                <CardBlockedModal />
            </Wrapper>
        </div>
    );
};

export default memo(Card);
