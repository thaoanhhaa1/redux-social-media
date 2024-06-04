import { images } from '../../assets';
import { useCardContext } from '../../contexts/CardContext';
import CardHidden, { CardHiddenButton } from '../cardHidden';

// TODO Manage Feed
const CardBlock = () => {
    const { tweet } = useCardContext();
    const { name, username } = tweet.user;

    return (
        <CardHidden
            headerImage={images.userBlock}
            title={`You have blocked ${name || username}`}
            description={`You won't be able to see or contact each other.`}
        >
            <CardHiddenButton image={images.manageOption} title='Manage Feed' />
        </CardHidden>
    );
};

export default CardBlock;
