import { Ref, memo, useEffect, useMemo, useRef } from 'react';
import { useEffectOnce, useIntersectionObserver } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useCardContext } from '../../contexts/CardContext';
import { useFocusTab } from '../../hooks';
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
    const isFocusTab = useFocusTab();
    const ref = useRef<HTMLDivElement | undefined>();
    const intersectionObserver = useIntersectionObserver(
        ref as React.RefObject<Element>,
        {
            threshold: 1,
        },
    );

    const { tweet, reportLoading, action } = useCardContext();
    const user = useAppSelector((state: RootState) => state.user);
    const showNotInterested = useMemo(
        () => tweet.notInterested && user._id !== tweet.user._id,
        [tweet, user],
    );
    const idTimeOut = useRef<NodeJS.Timeout | undefined>();
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        const cardElement = ref.current;

        if (!cardElement) return;

        const moreElement = cardElement.getElementsByClassName('card__more')[0];

        if (!moreElement) return;

        const { top, height } = moreElement.getBoundingClientRect();

        if (top > height)
            moreElement.classList.add('!top-0', '-translate-y-full');
    });

    useEffect(() => {
        const handleScroll = () => {
            if (
                intersectionObserver?.isIntersecting &&
                !tweet.viewed &&
                !idTimeOut.current &&
                isFocusTab
            )
                idTimeOut.current = setTimeout(
                    () => {
                        dispatch(
                            action.addViewer({
                                tweetId: tweet._id,
                                tweetOwner: tweet.user._id,
                            }),
                        );
                    },
                    isPopup ? 0 : 3000,
                );
            else {
                clearTimeout(idTimeOut.current);
                idTimeOut.current = undefined;
            }
        };

        handleScroll();

        return () => {
            clearTimeout(idTimeOut.current);
            idTimeOut.current = undefined;
        };
    }, [
        action,
        dispatch,
        intersectionObserver?.isIntersecting,
        isFocusTab,
        isPopup,
        tweet._id,
        tweet.user._id,
        tweet.viewed,
    ]);

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
