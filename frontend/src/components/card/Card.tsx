import { Ref, memo, useRef } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import CardProvider from '../../contexts/CardContext';
import { ITweet } from '../../interfaces';
import { classNames } from '../../utils';
import Wrapper from '../wrapper/Wrapper';
import CardInformation from './CardInformation';
import CardProfile from './CardProfile';

const Card = ({
    tweet,
    className = '',
    isPopup = false,
}: {
    tweet: ITweet;
    className?: string;
    isPopup?: boolean;
}) => {
    const ref = useRef<HTMLDivElement | undefined>();

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

    return (
        <CardProvider value={{ ...tweet, isPopup }}>
            <Wrapper
                ref={ref as Ref<HTMLDivElement> | undefined}
                className={classNames('card p-2 xxs:p-5', className)}
            >
                <CardProfile />
                <CardInformation />
            </Wrapper>
        </CardProvider>
    );
};

export default memo(Card);
