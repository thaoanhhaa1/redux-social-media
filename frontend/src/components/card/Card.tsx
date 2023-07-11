import CardProvider from '../../contexts/CardContext';
import { ITweet } from '../../interfaces';
import IUserTweet from '../../interfaces/IUserTweet';
import { classNames } from '../../utils';
import Wrapper from '../wrapper/Wrapper';
import CardInformation from './CardInformation';
import CardProfile from './CardProfile';

const Card = ({
    user,
    tweet,
    className = '',
}: {
    user: IUserTweet;
    tweet: ITweet;
    className?: string;
}) => {
    return (
        <CardProvider value={{ user, tweet }}>
            <Wrapper className={classNames('p-5', className)}>
                <CardProfile />
                <CardInformation />
            </Wrapper>
        </CardProvider>
    );
};

export default Card;
