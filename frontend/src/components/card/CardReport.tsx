import { images } from '../../assets';
import { useCardContext } from '../../contexts/CardContext';
import CardHidden, { CardHiddenButton } from '../cardHidden';

const CardReport = ({ loading }: { loading: boolean }) => {
    const { tweet, toggleReport } = useCardContext();

    return (
        <CardHidden
            loading={loading}
            title='Hidden'
            description='Reporting helps us deal with unwanted content.'
            headerImage={images.warnChat}
            onUndo={toggleReport}
        >
            <CardHiddenButton
                image={images.clock}
                title={`Snooze ${
                    tweet.user.name || tweet.user.username
                } for 30 days`}
                description='Temporarily stop seeing posts.'
                // TODO onClick
            />
            <CardHiddenButton image={images.manageOption} title='Manage Feed' />
        </CardHidden>
    );
};

export default CardReport;
