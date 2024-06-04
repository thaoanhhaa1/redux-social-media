import { images } from '../../assets';
import { useCardContext } from '../../contexts/CardContext';
import CardHidden from '../cardHidden';

const CardNotInterested = () => {
    const { toggleNotInterested } = useCardContext();

    return (
        <CardHidden
            onUndo={toggleNotInterested}
            title='Hidden'
            description='Hiding tweet helps us personalize your Feed.'
            headerImage={images.closeBorder}
        />
    );
};

export default CardNotInterested;
