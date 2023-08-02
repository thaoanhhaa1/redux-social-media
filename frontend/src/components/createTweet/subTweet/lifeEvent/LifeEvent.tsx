import useCreateTweet from '../../../../contexts/CreateTweetContext';
import Header from '../../Header';

const LifeEvent = () => {
    const { handleHiddenSub } = useCreateTweet();

    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                Create life event
            </Header>
        </>
    );
};

export default LifeEvent;
